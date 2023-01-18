const User = require('../model/User');
const express = require('express');
const router = express.Router();

const handleNewConversation = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const newConversation = req.body.conversation;
    if (!refreshToken) return res.sendStatus(401);

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403) //Forbiden

    // let messageExists = false;
    // const updatedConversations = foundUser.conversations.map(conversation => {
    //     if (arrayEquality(conversation.recipients, newConversation.recipients)) {
    //         messageExists = true;

    //         return {
    //             ...conversation,
    //             messages: [...conversation.messages, newConversation.message]
    //         }
    //     }

    //     return conversation;
    // });

    // if (messageExists) {
    //     foundUser.conversations = updatedConversations;
    // } else {
    //     foundUser.conversations = [...foundUser.conversations, newConversation];
    // }

    newConversation.recipients.map(async recipient => {
        const foundRecipient = await User.findOne({ username: recipient }).exec();

        foundRecipient.conversations = [...foundRecipient.conversations, newConversation];
        foundRecipient.save()
            .then(() => {
                if (recipient === foundUser.username) res.json(foundUser.conversations)
            }).catch(err => res.json('Error' + err));
    })


    // foundUser.save()
    //     .then(() => res.json(foundUser.conversations))
    //     .catch(err => res.json('Error' + err));
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}


router.post('/', handleNewConversation);
module.exports = router;