const router = require('express').Router();
const User = require('../model/User');

const getConversations = async(req, res) => {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) return res.sendStatus(401);

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403) //Forbiden

    res.json(foundUser.conversations);
}

router.post('/', getConversations);
module.exports = router;