require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const allowedOrigins = require('./config/allowedOrigins')

const PORT = process.env.PORT || 4000;
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

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

