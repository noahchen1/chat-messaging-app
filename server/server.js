require('dotenv').config();
const PORT = process.env.PORT || 4000;

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
const allowedOrigins = require('./config/allowedOrigins');

const URI = process.env.ATLAS_URI;
const connectDB = () => {
    const connection = mongoose.connection;
    mongoose.set('strictQuery', true);
    mongoose.connect(URI);

    connection.once('open', () => console.log('connection to DB established!'));
    connection.on('error', err => console.log(err));
}


app.use(express.json());
app.use(cors(allowedOrigins));
connectDB();

app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/refresh', require('./routes/refresh'));
app.use('/new-contact', require('./routes/updateContacts'));
app.use('/new-conversation', require('./routes/updateConversations'));
app.use('/contacts', require('./routes/contacts'));
app.use('/conversations', require('./routes/conversations'));

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));


const User = require('./model/User');
const io = require('socket.io')(5000, {
    cors: {
        origin: ['http://localhost:3000']
    }
});




io.on('connection', async socket => {
    console.log('a user connected')

    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', async ({ recipients, text }) => {
        const foundUser = await User.findOne({ username: id }).exec();

        recipients.map(async recipient => {
            const foundRecipient = await User.findOne({ username: recipient }).exec();

            const updatedConversations = foundRecipient.conversations.map(conversation => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    return {
                        ...conversation,
                        messages: [...conversation.messages, { sender: id, text: text }]
                    }

                }
                return conversation;

            })

            foundRecipient.conversations = updatedConversations;
            foundRecipient.save()

            recipients.forEach(recipient => {
                const newRecipients = recipients.filter(r => r !== recipient);

                newRecipients.push(id)
                socket.broadcast.to(recipient).emit('receive-message', {
                    recipients: newRecipients, sender: id, text
                })
            })
                // .then(res => {
                //     res.json(foundUser.conversations)

                //     recipients.forEach(recipient => {
                //         const newRecipients = recipients.filter(r => r !== recipient);

                //         newRecipients.push(id)
                //         socket.broadcast.to(recipient).emit('receive-message', {
                //             recipients: newRecipients, sender: id, text
                //         })
                //     })

                // })
        })
    })
})

function arrayEquality(a, b) {
    if (a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}

