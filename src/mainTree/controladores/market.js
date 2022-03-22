const express = require('express');
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const morgan = require(`morgan`);
const path = require('path');
const multer = require(`multer`)
const { unlink } = require(`fs-extra`)

const Unidades = require("../../models/marketPlace/cliente/Unidades");
const User = require("../../modelo/models/marketPlace/User");

router.get('/unidades', async (req, res) => {
    let unidFidei = /./;

    if ((req.query.unid == "Todos" || req.query.unid == "") || req.query.unid == undefined || req.query.unid == `undefined`) {

        unidFidei = /./
    } else {
        unidFidei = req.query.unid
    }

    const unidades = await Unidades.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "unidadesUser"
        }
    },
    {
        $match: { name: unidFidei }
    }, {
        $project: {
            _id: 1,
            name: 1,
            direccion: 1,
            pisos: 1,
            deptos: 1,
            oficinaTotal: 1,
            cocheraTotal: 1,
            localesTotal: 1,
            mono: 1,
            unaHab: 1,
            dosHab: 1,
            tresHab: 1,
            cuatroHab: 1,
            oficina: 1,
            cochera: 1,
            locales: 1,
            texto: 1,
            descripcion: 1,
            date: 1,
            username: "$unidadesUser.username",
            habilitado: 1
        }
    }
    ]);

    let unid = [];
    let UnidadesFidei = function (_id, name, direccion, pisos, deptos, oficinaTotal, cocheraTotal, localesTotal, mono, unaHab, dosHab, tresHab, cuatroHab, oficina, cochera, locales, texto, descripcion, date, username, habilitado) {

        this.name = name;
        this.direccion = direccion;
        this.pisos = pisos;
        this.deptos = deptos;
        this.oficinaTotal = oficinaTotal;
        this.cocheraTotal = cocheraTotal;
        this.localesTotal = localesTotal;
        this.mono = mono;
        this.unaHab = unaHab;
        this.dosHab = dosHab;
        this.tresHab = tresHab;
        this.cuatroHab = cuatroHab;
        this.oficina = oficina;
        this.cochera = cochera;
        this.locales = locales;
        this.unidadesTorres = {
            texto: texto,
            descripcion: descripcion,
        };
        this.username = username;
        this.id = _id;
        this.date = date;
        this.habilitado = habilitado;
    }
    for (let x = 0; x < unidades.length; x++) {

        let un = new UnidadesFidei(
            unidades[x]._id,
            unidades[x].name,
            unidades[x].direccion,
            unidades[x].pisos,
            unidades[x].deptos,
            unidades[x].oficinaTotal,
            unidades[x].cocheraTotal,
            unidades[x].localesTotal,
            unidades[x].mono,
            unidades[x].unaHab,
            unidades[x].dosHab,
            unidades[x].tresHab,
            unidades[x].cuatroHab,
            unidades[x].oficina,
            unidades[x].cochera,
            unidades[x].locales,
            unidades[x].texto,
            unidades[x].descripcion,
            unidades[x].date,
            unidades[x].username,
            unidades[x].habilitado)

        unid.push(un);
    }

    res.json(unid);

});
router.get('/unidadesDestino', async (req, res) => {

    const unidades = await Unidades.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "unidadesUser"
        }
    },
    {
        $project: {
            _id: 1,
            name: 1,
            pisos: 1,
            deptos: 1,
            cochera: 1,
            locales: 1,
            date: 1,
            username: "$unidadesUser.username",
            habilitado: 1
        }
    }
    ]);

    res.json(unidades);

});
router.post('/unidades', async (req, res) => {
    try {
        let { name, direccion, pisos, deptos, mono, unaHab, dosHab, tresHab, cuatroHab, oficina, oficinaTotal, cochera, cocheraTotal, localesTotal, locales, texto, descripcion, date, username, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newUnidades = new Unidades({
            name,
            direccion,
            pisos,
            deptos,
            oficinaTotal,
            cocheraTotal,
            localesTotal,
            mono,
            unaHab,
            dosHab,
            tresHab,
            cuatroHab,
            oficina,
            cochera,
            locales,
            texto,
            descripcion,
            date,
            username: usersFound.map((user) => user._id),
            habilitado
        });

        let unidades = await newUnidades.save();

        res.json({
            mensaje: `La unidad "${name}" fue creada con exito`,
            posteo: unidades
        });
    } catch (error) {
        console.error(error);
    }
});
router.delete('/unidades', async (req, res) => {

    let { id, habilitado } = req.body;

    const newUnidadesHab = ({
        habilitado
    })

    let unidadesHab = await Unidades.findByIdAndUpdate(id, newUnidadesHab);

    res.json(`El registro ha sido eliminado con exito`);

})
router.put('/unidadesDoble', async (req, res) => {
    try {
        let { name, value, id, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newUnidadesAct = new Object

        let textoAreaDividido = name.split(" ");

        newUnidadesAct[textoAreaDividido[0]] = new Object

        newUnidadesAct[textoAreaDividido[0]][textoAreaDividido[1]] = value

        newUnidadesAct[textoAreaDividido[0]] = new Object

        newUnidadesAct.username = usersFound.map((user) => user._id)

        let unidades = await Unidades.findByIdAndUpdate(id, newUnidadesAct);

        res.json(`El detalle del fideicomiso fue actualizado`);


    } catch (error) {
        console.error(error);
    }
});
router.put('/unidadesDobleEliminar', async (req, res) => {
    try {

        let { id, username, date } = req.body;


        const usersFound = await User.find({ username: { $in: username } });

        const newUnidadesAct = ({
            mono: [],
            unaHab: [],
            dosHab: [],
            tresHab: [],
            cuatroHab: [],
            oficina: [],
            cochera: [],
            locales: [],
            date,
            username: usersFound.map((user) => user._id),


        });

        var subRubro = await Unidades.findByIdAndUpdate(id, newUnidadesAct);

        res.json(`El detalle del fideicomiso fue actualizado`);


    } catch (error) {
        console.error(error);
    }
});
router.put('/unidades', async (req, res) => {
    try {
        let { _id, name, direccion, pisos, deptos, oficinaTotal, cocheraTotal, localesTotal, plantaBaja, subsuelo, torres, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newUnidadesAct = ({
            name,
            direccion,
            pisos,
            deptos,
            oficinaTotal,
            cocheraTotal,
            localesTotal,
            plantaBaja,
            subsuelo,
            torres,
            date,
            username: usersFound.map((user) => user._id),

        });

        var subRubro = await Unidades.findByIdAndUpdate(_id, newUnidadesAct);
        res.json(`EL sub Rubro ${name} fue actualizado`);


    } catch (error) {
        console.error(error);
    }
});

module.exports = router;