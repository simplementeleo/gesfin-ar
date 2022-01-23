const express = require('express');
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const morgan = require(`morgan`);
const path = require('path');
const multer = require(`multer`)

const User = require("../models/marketPlace/User");
const { rawListeners } = require('../models/marketPlace/User');

router.get('/', (req, res) => {
    res.render('inicio/login');
});

router.get('/marketp/signup', (req, res) => {
    res.render('inicio/signup');
});

router.post("/users/register", async (req, res) => {
    let errors = [];

    let { name, surname, username, email, password, password2 } = req.body;

    if (!name || !email || !username || !surname || !password || !password2) {
        errors.push({ message: "Complete todos los campos" });
    }

    if (password.length < 6) {
        errors.push({ text: "La contraseña debe ser al menos de 6 caracteres" });
    }

    if (password !== password2) {
        errors.push({ text: "Las contraseñas no coinciden" });
    }

    if (errors.length > 0) {
        res.render("register", { errors, name, surname, username, email, password, password2 });
    } else {
        const emailUser = await User.findOne({ email: email });
        const usernameUser = await User.findOne({ username: username });

        if (emailUser) {
            req.flash("error_msg", "El email ya existe");
            res.redirect("/users/signup");
        } else if (usernameUser) {
            req.flash("error_msg", "El usuario ya existe");
            res.redirect("/users/signup");
        } else {

            const newUser = new User({ name, surname, username, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Estas Registrado');
            res.redirect('/users/signin');
        }
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You have logged out successfully")
    res.redirect("/");
});

module.exports = router;
