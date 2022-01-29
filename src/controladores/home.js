const express = require('express');
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const morgan = require(`morgan`);
const path = require('path');
const multer = require(`multer`)

const User = require("../models/marketPlace/User");

router.post("/users/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true
}));

router.get('/home', (req, res) => {
    res.render('home/homeLog', { userNombre: req.user.name, username: req.user.username });
});

module.exports = router;