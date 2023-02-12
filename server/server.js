require("dotenv").config();
const PORT = process.env.PORT || 1000;
// const PORT_1 = process.env.PORT_1 || 1000;
// const PORT_2 = process.env.PORT_2 || 2000;

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const http = require('http').createServer(app);
const cors = require("cors");
const allowedOrigins = require("./config/allowedOrigins");

const URI = process.env.ATLAS_URI;
const connectDB = () => {
  const connection = mongoose.connection;
  mongoose.set("strictQuery", true);
  mongoose.connect(URI);

  connection.once("open", () => console.log("connection to DB established!"));
  connection.on("error", err => console.log(err));
};

app.use(express.json());
app.use(cors(allowedOrigins));
connectDB();

app.use("/auth", require("./routes/auth"));
app.use("/register", require("./routes/register"));
app.use("/refresh", require("./routes/refresh"));
app.use("/new-contact", require("./routes/updateContacts"));
app.use("/new-conversation", require("./routes/updateConversations"));
app.use("/contacts", require("./routes/contacts"));
app.use("/conversations", require("./routes/conversations"));

http.listen(PORT, () => console.log(`server is running on port ${PORT}`));

const User = require("./model/User");
const io = require("socket.io")(http, {
  cors: {
    origin: ["https://chat-app-zs9s.onrender.com"],
  },
});

io.on("connection", async socket => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", async ({ recipients, text }) => {
    recipients.map(async recipient => {
      const foundRecipient = await User.findOne({ username: recipient }).exec();
      const updatedConversations = foundRecipient.conversations.map(
        conversation => {
          if (arrayEquality(conversation.recipients, recipients)) {
            return {
              ...conversation,
              messages: [...conversation.messages, { sender: id, text: text }],
            };
          }
          return conversation;
        }
      );

      foundRecipient.conversations = updatedConversations;
      foundRecipient.save();
    });

    socket.broadcast.emit("receive-message", {
      recipients: recipients,
      sender: id,
      text,
    });
  });

  socket.on("create-conversation", () => {
    socket.emit("recieve-new-conversation");
    socket.broadcast.emit("recieve-new-conversation");
  });
});

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}