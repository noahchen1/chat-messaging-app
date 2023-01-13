const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contacts: Array,
    conversations: Array,
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);