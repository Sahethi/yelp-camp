const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require('../models/user');

router.get('/register', (req, res) => {
    //rendering the register page
    res.render('users/register');
})

router.post('/register', async (req, res) => {
    res.send(req.body);
})

module.exports = router;