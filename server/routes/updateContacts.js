const User = require('../model/User');
const express= require('express');
const router = express.Router();

const handleNewContact = async(req, res) => {
    const username = req.body.username;
    const foundUser = await User.findOne({ username: username }).exec();
    const newContact = {
        username: req.body.contactId,
        name: req.body.contactName
    };

    const foundUserToAdd = await User.findOne({ username: newContact.username }).exec();
    if (!foundUserToAdd) return res.sendStatus(400);
    
    foundUser.contacts = [...foundUser.contacts, newContact];
    foundUser.save()
        .then(() => res.json(`new contact ${newContact.name} has been added!`))
        .catch(err => res.json('Error' + err));
} 

router.post('/', handleNewContact);
module.exports = router;



