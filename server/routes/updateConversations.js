const User = require('../model/User');
const express = require('express');
const router = express.Router();

const handleNewConversation = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const newConversation = req.body.conversation;
    if (!refreshToken) return res.sendStatus(401);

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403) //Forbiden

    newConversation.recipients.map(async recipient => {
        const foundRecipient = await User.findOne({ username: recipient }).exec();

        foundRecipient.conversations = [...foundRecipient.conversations, newConversation];
        foundRecipient.save()
            .then(() => {
                if (recipient === foundUser.username) res.json(foundUser.conversations)
            }).catch(err => res.json('Error' + err));
    })


}

router.post('/', handleNewConversation);
module.exports = router;