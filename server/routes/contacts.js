const router = require('express').Router();
const User = require('../model/User');

const getContacts = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403) //Forbiden

    User.find()
        .then(users => {
            const usernameArr = [];

            users.forEach(user => usernameArr.push(user.username));
            res.json(usernameArr)
        })
        .catch(err => res.status(400).json('Error' + err));
}

router.post('/', getContacts);
module.exports = router;