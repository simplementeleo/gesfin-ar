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
            plantaBaja: 1,
            subsuelo: 1,
            torres: 1,
            mono: 1,
            unaHab: 1,
            dosHab: 1,
            tresHab: 1,
            cuatroHab: 1,
            oficina: 1,
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
        let { name, direccion, pisos, deptos, mono, unaHab, dosHab, tresHab, cuatroHab, oficina, oficinaTotal, cochera, cocheraTotal, localesTotal, locales, date, username, habilitado } = req.body;

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
        let monoamb = [];
        let uh = []
        let dh = []
        let th = []
        let ch = []
        let of = []
        let co = []
        let lo = []

        let { id, nombreCol, fila, mono, unaHab, dosHab, tresHab, cuatroHab, oficina, cochera, locales, username, date } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        for (x = 0; x < unaHab.length; x++) {

            let monoa = [{ nombreCol: nombreCol[x] }, { fila: fila[x] }, { cantidad: mono[x] }];
            let uha = [{ nombreCol: nombreCol[x] }, { fila: fila[x] }, { cantidad: unaHab[x] }];
            let dha = [{ nombreCol: nombreCol[x] }, { fila: fila[x] }, { cantidad: dosHab[x] }];
            let tha = [{ nombreCol: nombreCol[x] }, { fila: fila[x] }, { cantidad: tresHab[x] }];
            let cha = [{ nombreCol: nombreCol[x] }, { fila: fila[x] }, { cantidad: cuatroHab[x] }];
            let ofi = [{ nombreCol: nombreCol[x] }, { fila: fila[x] }, { cantidad: oficina[x] }];
            let coc = [{ nombreCol: nombreCol[x] }, { fila: fila[x] }, { cantidad: cochera[x] }];
            let loc = [{ nombreCol: nombreCol[x] }, { fila: fila[x] }, { cantidad: locales[x] }];

            monoamb.push(monoa);
            uh.push(uha);
            dh.push(dha);
            th.push(tha);
            ch.push(cha);
            of.push(ofi);
            co.push(coc);
            lo.push(loc)

        }


        const newUnidadesAct = ({
            mono: monoamb,
            unaHab: uh,
            dosHab: dh,
            tresHab: th,
            cuatroHab: ch,
            oficina: of,
            cochera: co,
            locales: lo,
            date,
            username: usersFound.map((user) => user._id),


        });

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