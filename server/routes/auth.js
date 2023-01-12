const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const handleLogin = async(req, res) => {
    const username = req.body.username;
    const pwd = req.body.password;

    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(400); //Unauthorized

    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        const accessToken = jwt.sign(
            {
                "User": {
                    "username": foundUser.username
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '20s' }
        )

        foundUser.refreshToken = refreshToken;
        foundUser.save()
            .then(() => res.json({ accessToken, refreshToken }))
            .catch(err => res.status(400).json('Error' + err));
    } else {
        res.sendStatus(401);
    }
};

router.post('/', handleLogin);
module.exports = router;
