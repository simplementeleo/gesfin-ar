const express = require('express');
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const morgan = require(`morgan`);
const path = require('path');
const multer = require(`multer`)

const User = require("../../modelo/models/marketPlace/User");
const NumeradorFiltro = require('../../models/NumeradorFiltro')
const Unidades = require("../../models/marketPlace/cliente/Unidades");

router.get('/numeradoresFiltro', async (req, res) => {

    let nameR = req.query.name;
    let unid = req.query.unid;

    const numerador = await NumeradorFiltro.aggregate([{
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
router.post(`/numeradoresFiltro`, async (req, res) => {

    try {
        let { name, num, unidades, username, } = req.body;

        const usersFound = await User.find({ username: { $in: username } });
        const unidadesFound = await Unidades.find({ name: { $in: unidades } });

        const newNumeroNumerador = new NumeradorFiltro({
            name,
            num,
            username: usersFound.map((user) => user._id),
            unidades: unidadesFound.map((unid) => unid._id),
        });
        var numeroNumerador = await newNumeroNumerador.save();

        res.json(`numerador Exitoso`);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;