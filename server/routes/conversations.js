const router = require('express').Router();
const User = require('../model/User');

const getConversations = async(req, res) => {
    const username = req.body.username;
    const foundUser = await User.findOne({ username: username }).exec();

    if (!foundUser) return res.sendStatus(400);

    res.json(foundUser.conversations);
}

router.post('/', getConversations);
module.exports = router;