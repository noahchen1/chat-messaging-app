const User = require('../model/User');
const express= require('express');
const router = express.Router();

const handleNewConversation = async(req, res) => {
    const username = req.body.username;
    const foundUser = await User.findOne({ username: username }).exec();
    const newConversation = req.body.conversation;
    
    foundUser.conversations = [...foundUser.conversations, newConversation];
    foundUser.save()
        .then(() => res.json('new conversation added!'))
        .catch(err => res.json('Error' + err));
} 

router.post('/', handleNewConversation);
module.exports = router;