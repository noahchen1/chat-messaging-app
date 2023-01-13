const router = require('express').Router();
const User = require('../model/User');

const getContacts = async(req, res) => {
    const username = req.body.username;
    console.log(username)
    const foundUser = await User.findOne({ username: username }).exec();

    if (!foundUser) return res.sendStatus(400);

    res.json(foundUser.contacts);
}

router.post('/', getContacts);
module.exports = router;