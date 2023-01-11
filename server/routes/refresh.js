const User = require('../model/User');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const handleRefreshToken = async(req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403) //Forbiden

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
            if (err || foundUser.username !== user.username) return res.sendStatus(403);

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": user.username
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json({ accessToken })
        }
    );
};

router.get('/', handleRefreshToken);
module.exports = router;