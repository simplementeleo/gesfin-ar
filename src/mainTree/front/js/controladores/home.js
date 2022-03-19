const express = require('express');
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const morgan = require(`morgan`);
const path = require('path');
const multer = require(`multer`)
const { unlink } = require(`fs-extra`)

const RubrosPagos = require("../models/marketPlace/pagos/RubrosPagos");

router.get('/rubroPagos', async (req, res) => {

    const rubroPago = await RubrosPagos.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "rubroPago"
        }
    },
    {
        $lookup: {
            from: "agrupadorrubropagos",
            localField: "agrupadorRubrosPago",
            foreignField: "_id",
            as: "agrupador"
        }
    },
    {
        $project: {
            _id: 1,
            nume: 1,
            name: 1,
            agrupadorRubrosPago: "$agrupador.name",
            date: 1,
            username: "$rubroPago.username",
            habilitado: 1
        }
    }
    ]);

    res.json(rubroPago);

});
router.post('/rubroPagos', async (req, res) => {
    try {
        let { nume, name, agrupadorRubrosPago, date, username, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });
        const agrupadorRubro = await AgrupadorRubroPagos.find({ name: { $in: agrupadorRubrosPago } });

        const newRubroPagos = new RubrosPagos({
            nume,
            name,
            agrupadorRubrosPago: agrupadorRubro.map((agrup) => agrup._id),
            date,
            username: usersFound.map((user) => user._id),
            habilitado

        });

        let rubroPagos = await newRubroPagos.save();


        res.json({
            mensaje: `El Rubro "${name}" fue creado con exito`,
            posteo: rubroPagos
        });


    } catch (error) {
        console.error(error);
    }
});
router.delete('/rubroPagos', async (req, res) => {

    let { id, habilitado } = req.body;

    const rubroPagHab = ({
        habilitado
    });

    let rubro = await RubrosPagos.findByIdAndUpdate(id, rubroPagHab);
    res.json(`El registro ha sido deshabilitado con exito`);

})
router.put('/rubroPagos', async (req, res) => {
    try {
        let { _id, nume, name, agrupadorRubrosPago, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });
        const agrupadorRubro = await AgrupadorRubroPagos.find({ name: { $in: agrupadorRubrosPago } });

        const newSubRubro = ({
            nume,
            name,
            agrupadorRubrosPago: agrupadorRubro.map((agrup) => agrup._id),
            date,
            username: usersFound.map((user) => user._id)

        });

        let subRubro = await RubrosPagos.findByIdAndUpdate(_id, newSubRubro);
        res.json(`EL Rubro ${name} fue actualizado`);


    } catch (error) {
        console.error(error);
    }
});

module.exports = router;