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
const Tipo = require("../../models/marketPlace/cliente/TipoUnidad");
const Rubros = require("../../models/marketPlace/cliente/Rubros");
const RubrosPagos = require("../../models/marketPlace/pagos/RubrosPagos");
const SubRubroPagos = require("../../models/marketPlace/pagos/SubRubroPagos");
const AgrupadorRubroPagos = require("../../models/marketPlace/pagos/AgrupadorRubroPagos");

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
            totales: 1,
            texto: 1,
            descripcion: 1,
            date: 1,
            username: "$unidadesUser.username",
            habilitado: 1
        }
    }
    ]);

    let unid = [];
    let UnidadesFidei = function (_id, name, direccion, pisos, deptos, oficinaTotal, cocheraTotal, localesTotal, mono, unaHab, dosHab, tresHab, cuatroHab, oficina, cochera, locales, totales, texto, descripcion, date, username, habilitado) {

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
        this.totales = totales;
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
            unidades[x].totales,
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
        let { name, direccion, pisos, deptos, mono, unaHab, dosHab, tresHab, cuatroHab, oficina, oficinaTotal, cochera, cocheraTotal, localesTotal, locales, totales, texto, descripcion, date, username, habilitado } = req.body;

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
            totales,
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
        let { id, username } = req.body;
        let keys = Object.keys(req.body);

        const usersFound = await User.find({ username: { $in: username } });

        const newUnidadesAct = new Object

        for (let x = 0; x < Object.keys(req.body).length; x++) {

            let nameSplit = keys[x].split(" ");

            if (nameSplit.length > 1) {
                if (newUnidadesAct[nameSplit[0]] == undefined) {

                    newUnidadesAct[nameSplit[0]] = new Object
                    newUnidadesAct[nameSplit[0]][nameSplit[1]] = []
                    newUnidadesAct[nameSplit[0]][nameSplit[1]].push(req.body[keys[x]])

                } else {
                    newUnidadesAct[nameSplit[0]][nameSplit[1]] = []
                    newUnidadesAct[nameSplit[0]][nameSplit[1]].push(req.body[keys[x]])
                }

            } else {

                newUnidadesAct[keys[x]] = req.body[keys[x]]
            }
        }
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
        let { id, username } = req.body;

        let keys = Object.keys(req.body);
        let newUnidadesAct = new Object;

        for (let x = 0; x < Object.keys(req.body).length; x++) {

            newUnidadesAct[keys[x]] = req.body[keys[x]]
        }

        const usersFound = await User.find({ username: { $in: username } });
        newUnidadesAct.username = usersFound.map((user) => user._id)
        delete newUnidadesAct.id



        var unids = await Unidades.findByIdAndUpdate(id, newUnidadesAct);

        res.json({
            mensaje: `La unidad  fue actualizada`,
            posteo: unids
        });


    } catch (error) {
        res.json(error)
        console.error(error);
    }
});
router.get('/rubro', async (req, res) => {

    const rubros = await Rubros.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "User"
        }
    },
    {
        $project: {
            _id: 1,
            num: 1,
            name: 1,
            date: 1,
            username: "$User.username",
            habilitado: 1
        }
    }
    ]);

    res.json(rubros);

});
router.post('/rubro', async (req, res) => {
    try {
        let { num, name, date, username, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newRubros = new Rubros({
            num,
            name,
            date,
            username: usersFound.map((user) => user._id),
            habilitado
        });

        let unidades = await newRubros.save();

        res.json({
            mensaje: `El rubro "${name}" fue creado con exito`,
            posteo: unidades
        });

    } catch (error) {
        console.error(error);
    }
});
router.delete('/rubro', async (req, res) => {

    let { id, habilitado } = req.body;

    const newRubrosHab = ({
        habilitado
    });

    let rubro = await Rubros.findByIdAndUpdate(id, newRubrosHab);
    res.json(`El registro ha sido deshabilitado con exito`);

})
router.put('/rubro', async (req, res) => {
    try {
        let { _id, num, name, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newRubrosAct = ({
            nume,
            name,
            date,
            username: usersFound.map((user) => user._id)

        });

        let rubro = await Rubros.findByIdAndUpdate(_id, newRubrosAct);
        res.json(`el Rubro ${name} fue actualizado`);


    } catch (error) {
        console.error(error);
    }
})
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
            num: 1,
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
        let { num, name, agrupadorRubrosPago, date, username, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });
        const agrupadorRubro = await AgrupadorRubroPagos.find({ name: { $in: agrupadorRubrosPago } });

        const newRubroPagos = new RubrosPagos({
            num,
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
        let { _id, num, name, agrupadorRubrosPago, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });
        const agrupadorRubro = await AgrupadorRubroPagos.find({ name: { $in: agrupadorRubrosPago } });

        const newSubRubro = ({
            num,
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
router.get('/subRubroPagos', async (req, res) => {

    const subRubroPago = await SubRubroPagos.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "subRubroPago"
        }
    }, {
        $project: {
            _id: 1,
            num: 1,
            name: 1,
            date: 1,
            username: "$subRubroPago.username",
            habilitado: 1
        }
    }]);

    res.json(subRubroPago);

});
router.post('/subRubroPagos', async (req, res) => {
    try {
        let { num, name, date, username, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newSubRubroPagos = new SubRubroPagos({
            num,
            name,
            date,
            username: usersFound.map((user) => user._id),
            habilitado
        });

        let subRubroPagos = await newSubRubroPagos.save();

        res.json({
            mensaje: `El Subrubro "${name}" fue creado con exito`,
            posteo: subRubroPagos
        });



    } catch (error) {
        console.error(error);
    }
});
router.delete('/subRubroPagos', async (req, res) => {

    let { id, habilitado } = req.body;

    const newsubRubroPagosHab = ({
        habilitado
    })

    let subRubro = await SubRubroPagos.findByIdAndUpdate(id, newsubRubroPagosHab);

    res.json(`El registro ha sido deshabilitado con exito`);

})
router.put('/subRubroPagos', async (req, res) => {
    try {
        let { _id, name, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newSubRubro = ({

            name,
            date,
            username: usersFound.map((user) => user._id)

        });

        let subRubro = await SubRubroPagos.findByIdAndUpdate(_id, newSubRubro);
        res.json(`EL sub Rubro ${name} fue actualizado`);


    } catch (error) {
        console.error(error);
    }
});
router.get('/agrupadorRubrosPago', async (req, res) => {

    const agrupadorRubroPago = await AgrupadorRubroPagos.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "rubroPago"
        }
    },
    {
        $project: {
            _id: 1,
            name: 1,
            date: 1,
            username: "$rubroPago.username",
            habilitado: 1

        }
    }
    ]);

    res.json(agrupadorRubroPago);

});
router.post('/agrupadorRubrosPago', async (req, res) => {
    try {
        let { name, date, username, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newAgrupadorRubroPagos = new AgrupadorRubroPagos({
            name,
            date,
            username: usersFound.map((user) => user._id),
            habilitado

        });

        let agrupadorRubroPagos = await newAgrupadorRubroPagos.save();

        res.json({
            mensaje: `El Agrupador "${name}" fue creado con exito`,
            posteo: agrupadorRubroPagos
        });

    } catch (error) {
        console.error(error);
    }
});
router.delete('/agrupadorRubrosPago', async (req, res) => {

    let { id, habilitado } = req.body;

    const agrupadorHab = ({
        habilitado
    });

    let agrupadorHa = await AgrupadorRubroPagos.findByIdAndUpdate(id, agrupadorHab);
    res.json(`El registro ha sido deshabilitado con exito`);

})
router.put('/agrupadorRubrosPago', async (req, res) => {
    try {
        let { _id, name, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newAgrupadorRubro = ({
            name,
            date,
            username: usersFound.map((user) => user._id)

        });

        let agrupadorPut = await AgrupadorRubroPagos.findByIdAndUpdate(_id, newAgrupadorRubro);
        res.json(`EL agrupador rubro de pagos ${name} fue actualizado`);


    } catch (error) {
        console.error(error);
    }
});

module.exports = router;