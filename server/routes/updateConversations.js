const User = require('../model/User');
const express= require('express');
const router = express.Router();

const handleNewConversation = async(req, res) => {
    const refreshToken = req.body.refreshToken;
    const newConversation = req.body.conversation;
    if (!refreshToken) return res.sendStatus(401);

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403) //Forbiden

    
    foundUser.conversations = [...foundUser.conversations, newConversation];
    foundUser.save()
        .then(() => res.json('new conversation added!'))
        .catch(err => res.json('Error' + err));
} 

router.post('/', handleNewConversation);
module.exports = router;