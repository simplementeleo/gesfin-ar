const express = require('express');
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const morgan = require(`morgan`);
const path = require('path');
const multer = require(`multer`)

const User = require("../models/marketPlace/User");
const Numerador = require('../models/Numerador')
const { rawListeners } = require('../models/marketPlace/User');

router.get('/', (req, res) => {
    res.render('home/home');
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
router

router.get('/numeradores', async (req, res) => {

    let nameR = req.query.name;

    const numerador = await Numerador.aggregate([{

        $match: {
            name: nameR,
        }
    },
    {
        $project: {
            num: 1,
            name: 1
        }
    },

    ]).sort({ _id: -1 }).limit(1);;



    res.json(numerador);


});
router.get('/numeradoresFiltro', async (req, res) => {

    let nameR = req.query.name;
    let unid = req.query.unid;

    const numerador = await Numerador.aggregate([{
        $lookup: {
            from: "unidades",
            localField: "unidades",
            foreignField: "_id",
            as: "unidadesNum"
        }
    },
    {
        $match: {
            name: nameR,
            "unidadesNum.name": unid
        }
    },
    {
        $project: {
            num: 1,
            name: 1,
            unidades: "$unidadesCR.name",
        }
    },

    ]).sort({ _id: -1 }).limit(1);;

    res.json(numerador);
});
router.post(`/numeradores`, async (req, res) => {

    try {
        let { name, num, username, } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newNumeroNumerador = new Numerador({
            name,
            num,
            username: usersFound.map((user) => user._id),
        });
        var numeroNumerador = await newNumeroNumerador.save();

        res.json(`numerador Exitoso`);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
