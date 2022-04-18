const express = require('express');
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const morgan = require(`morgan`);
const path = require('path');
const multer = require(`multer`)
const { unlink } = require(`fs-extra`)

const User = require("../models/marketPlace/User");
const Error = require("../models/home/crm/Error");
const Requerimiento = require("../models/home/crm/Requerimiento");

const Tarea = require("../models/marketPlace/procesos/Tarea");
const Estado = require("../models/marketPlace/procesos/Estado");
const Criticidad = require("../models/marketPlace/procesos/Criticidad");
const Cliente = require("../models/marketPlace/terceros/Cliente");

//financiero
const MovimientoFinanciero = require("../models/home/operacionFinanciera/MovimientosFinancieros");
const ProyectadoCash = require("../models/home/operacionFinanciera/MovimientosFinancieros");

//Indices
const Icc = require("../models/home/indices/Icc");
const TipoCambio = require("../models/home/indices/TipoDeCambio");
console.log(2)
router.post("/users/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true
}));
//hola forro trolo loco
router.get('/home', (req, res) => {

    const GrupoSeguridad = require("../models/marketPlace/seguridad/Grupo")

    res.render('home/homeLog', { userNombre: req.user.name, username: req.user.username, userPermisos: req.user.grupoSeguridad });
});
router.get('/error', async (req, res) => {

    const errores = await Error.aggregate([{
        $lookup: {
            from: "clientes",
            localField: "cliente",
            foreignField: "_id",
            as: "clienteError",
        }
    }, {
        $lookup: {
            from: "criticidads",
            localField: "criticidad",
            foreignField: "_id",
            as: "errorCrtic",
        }
    },
    {
        $lookup: {
            from: "estados",
            localField: "estado",
            foreignField: "_id",
            as: "errorEstado",
        }
    },
    {
        $lookup: {
            from: "tareas",
            localField: "tarea",
            foreignField: "_id",
            as: "errorTareas",
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "errorUser",
        }
    },
    {
        $project: {
            _id: 1,
            num: 1,
            fecha: 1,
            cliente: "$clienteError.name",
            observaciones: 1,
            observacionesCompleto: 1,
            criticidad: "$errorCrtic.name",
            filename: 1,
            path: 1,
            originalname: 1,
            estadoProceso: "$errorEstado.name",
            fechaDos: 1,
            descripcionCompleto: 1,
            fechaTres: 1,
            tarea: "$errorTareas.name",
            tiempoEstimado: 1,
            tiempoConsumido: 1,
            tiempoRemanente: 1,
            observacionesColec: 1,
            descripcionAdjunto: 1,
            filenameColec: 1,
            pathColec: 1,
            originalnameColec: 1,
            username: "$errorUser.username",
            date: 1,
        }
    }
    ]);
    let errors = [];
    let ErroresCargados = function (num, fecha, cliente, observaciones, observacionesCompleto, criticidad, filename, path, originalname, estadoProceso, fechaDos, descripcionCompleto, fechaTres, tarea, tiempoEstimado, tiempoConsumido, tiempoRemanente, observacionesColec, descripcionAdjunto, filenameColec, pathColec, originalnameColec, username, id, date) {

        this.num = num;
        this.fecha = fecha;
        this.cliente = cliente;
        this.observaciones = observaciones;
        this.observacionesCompleto = observacionesCompleto;
        this.criticidad = criticidad;
        this.adjunto = {
            filename: filename,
            path: path,
            originalname: originalname,
        };
        this.estadoProceso = estadoProceso;
        this.fechaDos = fechaDos;
        this.descripcionCompleto = descripcionCompleto;
        this.fechaTres = fechaTres;
        this.tareas = {
            tarea: tarea,
            tiempoEstimado: tiempoEstimado,
            tiempoConsumido: tiempoConsumido,
            tiempoRemanente: tiempoRemanente,
            observacionesColec: observacionesColec
        };
        this.adjuntos = {
            descripcionAdjunto: descripcionAdjunto,
            filenamecolecCount: filenameColec,
            adjuntoColeccion: {
                filenameColec: filenameColec,
                pathColec: pathColec,
                originalnameColec: originalnameColec
            },
        };
        this.username = username;
        this.id = id;
        this.date = date;
    }

    for (let x = 0; x < errores.length; x++) {

        let error = new ErroresCargados(
            errores[x].num,
            errores[x].fecha,
            errores[x].cliente,
            errores[x].observaciones,
            errores[x].observacionesCompleto,
            errores[x].criticidad,
            errores[x].filename,
            errores[x].path,
            errores[x].originalname,
            errores[x].estadoProceso,
            errores[x].fechaDos,
            errores[x].descripcionCompleto,
            errores[x].fechaTres,
            errores[x].tarea,
            errores[x].tiempoEstimado,
            errores[x].tiempoConsumido,
            errores[x].tiempoRemanente,
            errores[x].observacionesColec,
            errores[x].descripcionAdjunto,
            errores[x].filenameColec,
            errores[x].pathColec,
            errores[x].originalnameColec,
            errores[x].username,
            errores[x]._id,
            errores[x].date)

        errors.push(error);
    }
    res.json(errors);


});
router.post('/error', async (req, res) => {
    try {
        let { num, fecha, cliente, observaciones, observacionesCompleto, criticidad, estadoProceso, fechaDos, descripcionCompleto, fechaTres, username, tarea, tiempoEstimado, tiempoConsumido, tiempoRemanente, observacionesColec, descripcionAdjunto, date } = req.body;

        let tareasArray = []
        if (Array.isArray(tarea)) {

            for (let x = 0; x < tarea.length; x++) {

                let tareasFound = await Tarea.find({ name: { $in: tarea[x] } });
                tareasArray.push(tareasFound.map((tar) => tar._id))
            }

        } else {
            let tareasFound = await Tarea.find({ name: { $in: tarea } });
            tareasArray.push(tareasFound.map((tar) => tar._id))
        }

        let filenameAdj = "";
        let pathAdj = "";
        let originalnameAdj = "";
        if (req.files.adjunto != undefined) {

            filenameAdj = req.files.adjunto[0].filename
            pathAdj = '/uploads/' + req.files.adjunto[0].filename
            originalnameAdj = req.files.adjunto[0].originalname
        }

        let filenameColec = [];
        let originalnameColec = [];

        if (req.files.adjuntoColeccion != undefined) {

            for (let x = 0; x < req.files.adjuntoColeccion.length; x++) {

                filenameColec.push(req.files.adjuntoColeccion[x].filename)
                originalnameColec.push(req.files.adjuntoColeccion[x].originalname)

            }
        }

        const usersFound = await User.find({ username: { $in: username } });
        const criticidadFound = await Criticidad.find({ name: { $in: criticidad } });
        const estadoFound = await Estado.find({ name: { $in: estadoProceso } });
        const clientesFound = await Cliente.find({ name: { $in: cliente } });


        const newError = new Error({
            num,
            fecha,
            cliente: clientesFound.map((cliente) => cliente._id),
            observaciones,
            observacionesCompleto,
            criticidad: criticidadFound.map((ctr) => ctr._id),
            filename: filenameAdj,
            path: pathAdj,
            originalname: originalnameAdj,
            estado: estadoFound.map((estado) => estado._id),
            fechaDos,
            descripcionCompleto,
            fechaTres,
            tarea: tareasArray,
            tiempoEstimado,
            tiempoConsumido,
            tiempoRemanente,
            observacionesColec,
            filenameColec: filenameColec,
            originalnameColec: originalnameColec,
            descripcionAdjunto,
            date,
            username: usersFound.map((user) => user._id),

        });

        let cobroRec = await newError.save();

        res.json({
            mensaje: `El error de  ${cliente} fue registrado con exito`,
            posteo: cobroRec
        });
    } catch (error) {
        console.error(error);
    }
});
router.put('/error', async (req, res) => {
    try {
        let { id, cliente, criticidad, estadoProceso, username, post, filenameColec, originalnameColec, tarea } = req.body;

        let postAdj = []
        if (Array.isArray(post)) {

            postAdj = post
        } else if (post != undefined && post != "") {

            postAdj.push(post)
        }
        let file = []
        let ori = []
        if (Array.isArray(filenameColec)) {
            file = filenameColec
            ori = originalnameColec
        } else {
            file = [filenameColec]
            ori = [originalnameColec]
        }

        let keys = Object.keys(req.body);
        let newErrorFlex = new Object;

        for (let x = 0; x < Object.keys(req.body).length; x++) {

            newErrorFlex[keys[x]] = req.body[keys[x]]
        }

        let tareasArray = []

        if (Array.isArray(tarea)) {

            for (let x = 0; x < tarea.length; x++) {

                let tareasFound = await Tarea.find({ name: { $in: tarea[x] } });
                tareasArray.push(tareasFound.map((tar) => tar._id))
            }

        } else if (tarea == undefined) {
            tareasArray = []
        } else {
            let tareasFound = await Tarea.find({ name: { $in: tarea } });
            tareasArray.push(tareasFound.map((tar) => tar._id))
        }

        newErrorFlex.tarea = tareasArray;
        const usersFound = await User.find({ username: { $in: username } });
        newErrorFlex.username = usersFound.map((user) => user._id)
        const criticidadFound = await Criticidad.find({ name: { $in: criticidad } });
        newErrorFlex.criticidad = criticidadFound.map((ctr) => ctr._id)
        const estadoFound = await Estado.find({ name: { $in: estadoProceso } });
        newErrorFlex.estado = estadoFound.map((estad) => estad._id)
        const clientesFound = await Cliente.find({ name: { $in: cliente } });
        newErrorFlex.cliente = clientesFound.map((clien) => clien._id)
        delete newErrorFlex.id

        if (req.files.adjunto != undefined) {

            newErrorFlex.filename = req.files.adjunto[0].filename,
                newErrorFlex.path = `/uploads/` + req.files.adjunto[0].filename,
                newErrorFlex.originalname = req.files.adjunto[0].originalname

        }

        if (postAdj.length > 0) {

            let enviarRegistro = new Object
            let filenameAdjuntoColec = []
            let originalNameAdjuntoColec = []
            let numberReqFile = 0
            let formColec = 0

            for (let x = 0; x < postAdj.length; x++) {

                if (postAdj[x] == `put`) {

                    filenameAdjuntoColec.push(file[formColec])
                    originalNameAdjuntoColec.push(ori[formColec])
                    formColec++

                } else {

                    filenameAdjuntoColec.push(req.files.adjuntoColeccion[numberReqFile].filename)
                    originalNameAdjuntoColec.push(req.files.adjuntoColeccion[numberReqFile].originalname)
                    numberReqFile++
                }
            }
            newErrorFlex.filenameColec = filenameAdjuntoColec
            newErrorFlex.originalnameColec = originalNameAdjuntoColec
        } else {
            newErrorFlex.filenameColec = ""
            newErrorFlex.originalnameColec = ""
        }

        let errorAct = await Error.findByIdAndUpdate(id, newErrorFlex);

        res.json(`El error de ${cliente} fue actualizado`);

    } catch (error) {
        console.error(error);
    }
});
router.delete('/error', async (req, res) => {

    let { id } = req.body;

    let error = await Error.findByIdAndDelete(id);

    unlink(path.resolve(`./src/front/uploads/` + error.filename))

    for (let x = 0; x < error.filenameColec.length; x++) {

        unlink(path.resolve(`./src/front/uploads/` + error.filenameColec[x]))
    }

    res.json('ok');

})

router.get('/requerimiento', async (req, res) => {

    const reqs = await Requerimiento.aggregate([{
        $lookup: {
            from: "clientes",
            localField: "cliente",
            foreignField: "_id",
            as: "clienteError",
        }
    }, {
        $lookup: {
            from: "criticidads",
            localField: "criticidad",
            foreignField: "_id",
            as: "errorCrtic",
        }
    },
    {
        $lookup: {
            from: "estados",
            localField: "estado",
            foreignField: "_id",
            as: "errorEstado",
        }
    },
    {
        $lookup: {
            from: "tareas",
            localField: "tarea",
            foreignField: "_id",
            as: "errorTareas",
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "errorUser",
        }
    },
    {
        $project: {
            _id: 1,
            num: 1,
            fecha: 1,
            cliente: "$clienteError.name",
            observaciones: 1,
            observacionesCompleto: 1,
            criticidad: "$errorCrtic.name",
            filename: 1,
            path: 1,
            originalname: 1,
            estadoProceso: "$errorEstado.name",
            fechaDos: 1,
            descripcionCompleto: 1,
            fechaTres: 1,
            tarea: "$errorTareas.name",
            tiempoEstimado: 1,
            tiempoConsumido: 1,
            tiempoRemanente: 1,
            observacionesColec: 1,
            descripcionAdjunto: 1,
            filenameColec: 1,
            pathColec: 1,
            originalnameColec: 1,
            username: "$errorUser.username",
            date: 1,
        }
    }
    ]);

    let reques = [];
    let RequesCargados = function (num, fecha, cliente, observaciones, observacionesCompleto, criticidad, filename, path, originalname, estadoProceso, fechaDos, descripcionCompleto, fechaTres, tarea, tiempoEstimado, tiempoConsumido, tiempoRemanente, observacionesColec, descripcionAdjunto, filenameColec, pathColec, originalnameColec, username, id, date) {

        this.num = num;
        this.fecha = fecha;
        this.cliente = cliente;
        this.observaciones = observaciones;
        this.observacionesCompleto = observacionesCompleto;
        this.criticidad = criticidad;
        this.adjunto = {
            filename: filename,
            path: path,
            originalname: originalname,
        };
        this.estadoProceso = estadoProceso;
        this.fechaDos = fechaDos;
        this.descripcionCompleto = descripcionCompleto;
        this.fechaTres = fechaTres;
        this.tareas = {
            tarea: tarea,
            tiempoEstimado: tiempoEstimado,
            tiempoConsumido: tiempoConsumido,
            tiempoRemanente: tiempoRemanente,
            observacionesColec: observacionesColec
        };
        this.adjuntos = {
            descripcionAdjunto: descripcionAdjunto,
            filenamecolecCount: filenameColec,
            adjuntoColeccion: {
                filenameColec: filenameColec,
                pathColec: pathColec,
                originalnameColec: originalnameColec
            },
        };
        this.username = username;
        this.id = id;
        this.date = date;
    }

    for (let x = 0; x < reqs.length; x++) {

        let reque = new RequesCargados(
            reqs[x].num,
            reqs[x].fecha,
            reqs[x].cliente,
            reqs[x].observaciones,
            reqs[x].observacionesCompleto,
            reqs[x].criticidad,
            reqs[x].filename,
            reqs[x].path,
            reqs[x].originalname,
            reqs[x].estadoProceso,
            reqs[x].fechaDos,
            reqs[x].descripcionCompleto,
            reqs[x].fechaTres,
            reqs[x].tarea,
            reqs[x].tiempoEstimado,
            reqs[x].tiempoConsumido,
            reqs[x].tiempoRemanente,
            reqs[x].observacionesColec,
            reqs[x].descripcionAdjunto,
            reqs[x].filenameColec,
            reqs[x].pathColec,
            reqs[x].originalnameColec,
            reqs[x].username,
            reqs[x]._id,
            reqs[x].date)

        reques.push(reque);
    }

    res.json(reques);


});
router.post('/requerimiento', async (req, res) => {
    try {
        let { num, fecha, cliente, observaciones, observacionesCompleto, criticidad, estadoProceso, fechaDos, descripcionCompleto, fechaTres, username, tarea, tiempoEstimado, tiempoConsumido, tiempoRemanente, observacionesColec, descripcionAdjunto, date } = req.body;

        let tareasArray = []
        if (Array.isArray(tarea)) {

            for (let x = 0; x < tarea.length; x++) {

                let tareasFound = await Tarea.find({ name: { $in: tarea[x] } });
                tareasArray.push(tareasFound.map((tar) => tar._id))
            }

        } else {
            let tareasFound = await Tarea.find({ name: { $in: tarea } });
            tareasArray.push(tareasFound.map((tar) => tar._id))
        }

        let filenameAdj = "";
        let pathAdj = "";
        let originalnameAdj = "";
        if (req.files.adjunto != undefined) {

            filenameAdj = req.files.adjunto[0].filename
            pathAdj = '/uploads/' + req.files.adjunto[0].filename
            originalnameAdj = req.files.adjunto[0].originalname
        }

        let filenameColec = [];
        let originalnameColec = [];

        if (req.files.adjuntoColeccion != undefined) {

            for (let x = 0; x < req.files.adjuntoColeccion.length; x++) {

                filenameColec.push(req.files.adjuntoColeccion[x].filename)
                originalnameColec.push(req.files.adjuntoColeccion[x].originalname)

            }
        }

        const usersFound = await User.find({ username: { $in: username } });
        const criticidadFound = await Criticidad.find({ name: { $in: criticidad } });
        const estadoFound = await Estado.find({ name: { $in: estadoProceso } });
        const clientesFound = await Cliente.find({ name: { $in: cliente } });


        const newReque = new Requerimiento({
            num,
            fecha,
            cliente: clientesFound.map((cliente) => cliente._id),
            observaciones,
            observacionesCompleto,
            criticidad: criticidadFound.map((ctr) => ctr._id),
            filename: filenameAdj,
            path: pathAdj,
            originalname: originalnameAdj,
            estado: estadoFound.map((estado) => estado._id),
            fechaDos,
            descripcionCompleto,
            fechaTres,
            tarea: tareasArray,
            tiempoEstimado,
            tiempoConsumido,
            tiempoRemanente,
            observacionesColec,
            filenameColec: filenameColec,
            originalnameColec: originalnameColec,
            descripcionAdjunto,
            date,
            username: usersFound.map((user) => user._id),

        });

        let Reque = await newReque.save();

        res.json({
            mensaje: `El reque de  ${cliente} fue registrado con exito`,
            posteo: Reque
        });
    } catch (error) {
        console.error(error);
    }
});
router.put('/requerimiento', async (req, res) => {
    try {
        let { id, cliente, criticidad, estadoProceso, username, post, filenameColec, originalnameColec, tarea } = req.body;

        let postAdj = []
        if (Array.isArray(post)) {

            postAdj = post
        } else if (post != undefined && post != "") {

            postAdj.push(post)
        }
        let file = []
        let ori = []
        if (Array.isArray(filenameColec)) {
            file = filenameColec
            ori = originalnameColec
        } else {
            file = [filenameColec]
            ori = [originalnameColec]
        }

        let keys = Object.keys(req.body);
        let newRequeFlex = new Object;

        for (let x = 0; x < Object.keys(req.body).length; x++) {

            newRequeFlex[keys[x]] = req.body[keys[x]]
        }

        let tareasArray = []
        if (Array.isArray(tarea)) {

            for (let x = 0; x < tarea.length; x++) {

                let tareasFound = await Tarea.find({ name: { $in: tarea[x] } });
                tareasArray.push(tareasFound.map((tar) => tar._id))
            }

        } else if (tarea == undefined) {
            tareasArray = []
        } else {
            let tareasFound = await Tarea.find({ name: { $in: tarea } });
            tareasArray.push(tareasFound.map((tar) => tar._id))
        }

        newRequeFlex.tarea = tareasArray;
        const usersFound = await User.find({ username: { $in: username } });
        newRequeFlex.username = usersFound.map((user) => user._id)
        const criticidadFound = await Criticidad.find({ name: { $in: criticidad } });
        newRequeFlex.criticidad = criticidadFound.map((ctr) => ctr._id)
        const estadoFound = await Estado.find({ name: { $in: estadoProceso } });
        newRequeFlex.estado = estadoFound.map((estad) => estad._id)
        const clientesFound = await Cliente.find({ name: { $in: cliente } });
        newRequeFlex.cliente = clientesFound.map((clien) => clien._id)
        delete newRequeFlex.id

        if (req.files.adjunto != undefined) {

            newErrorFlex.filename = req.files.adjunto[0].filename,
                newErrorFlex.path = `/uploads/` + req.files.adjunto[0].filename,
                newErrorFlex.originalname = req.files.adjunto[0].originalname

        }

        if (postAdj.length > 0) {


            let filenameAdjuntoColec = []
            let originalNameAdjuntoColec = []
            let numberReqFile = 0
            let formColec = 0

            for (let x = 0; x < postAdj.length; x++) {

                if (postAdj[x] == `put`) {

                    filenameAdjuntoColec.push(file[formColec])
                    originalNameAdjuntoColec.push(ori[formColec])
                    formColec++

                } else {

                    filenameAdjuntoColec.push(req.files.adjuntoColeccion[numberReqFile].filename)
                    originalNameAdjuntoColec.push(req.files.adjuntoColeccion[numberReqFile].originalname)
                    numberReqFile++
                }
            }
            newRequeFlex.filenameColec = filenameAdjuntoColec
            newRequeFlex.originalnameColec = originalNameAdjuntoColec
        } else {
            newRequeFlex.filenameColec = ""
            newRequeFlex.originalnameColec = ""
        }

        let requeAct = await Requerimiento.findByIdAndUpdate(id, newRequeFlex);

        res.json(`El error de ${cliente} fue actualizado`);

    } catch (error) {
        console.error(error);
    }
});
router.delete('/requerimiento', async (req, res) => {

    let { id } = req.body;

    let reque = await Requerimiento.findByIdAndDelete(id);

    unlink(path.resolve(`./src/front/uploads/` + reque.filename))

    for (let x = 0; x < error.filenameColec.length; x++) {

        unlink(path.resolve(`./src/front/uploads/` + reque.filenameColec[x]))
    }
    res.json('ok');

})
//Operaciones financieras
router.get('/movimientoFinanciero', async (req, res) => {
    let fechaHasta = req.query.fechaHasta
    let unidFidei = /./;

    if (req.query.unid != "undefined") {

        unidFidei = req.query.unid
    }

    if ((req.query.unid == "Todos") || (req.query.unid == "todos") || (req.query.unid == "")) {

        unidFidei = /./;
    }

    const mf = await MovimientoFinanciero.aggregate([{

        $lookup: {
            from: "unidades",
            localField: "unidades",
            foreignField: "_id",
            as: "unidadesMv"
        }
    },
    {
        $lookup: {
            from: "tipopagos",
            localField: "tipoPagos",
            foreignField: "_id",
            as: "tipoPagos"
        }
    },
    {
        $lookup: {
            from: "monedas",
            localField: "moneda",
            foreignField: "_id",
            as: "moneda"
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $match: {
            "unidadesMv.name": unidFidei,

        }
    },
    {
        $project: {
            _id: 1,
            num: 1,
            origen: 1,
            fecha: 1,
            unidades: "$unidadesMv.name",
            moneda: "$moneda.name",
            importeDesencadenado: 1,
            importeDesencadenadoArs: 1,
            importeDesencadenadoUsd: 1,
            tc: 1,
            tipo: "$tipoPagos.name",
            observaciones: 1,
            date: 1,
            username: "$user.username",
            idDesen: 1,
            desen: 1,
            position: 1,
            idColec: 1
        }
    }
    ]);
    let movimientoFinanciero = [];
    let MovFinanciero = function (_id, num, origen, fecha, unidades, moneda, importeDesencadenado, importeDesencadenadoArs, importeDesencadenadoUsd, tc, tipo, observaciones, date, username, idDesen, desen, position, idColec) {
        this.id = _id;
        this.num = num;
        this.origen = origen;
        this.fecha = fecha;
        this.unidades = unidades;
        this.moneda = moneda;
        this.importeDesencadenado = importeDesencadenado;
        this.importeDesencadenadoArs = importeDesencadenadoArs;
        this.importeDesencadenadoUsd = importeDesencadenadoUsd;
        this.tc = tc;
        this.tipoPago = tipo;
        this.observaciones = observaciones;
        this.date = date;
        this.username = username;
        this.idDesen = idDesen;
        this.desen = desen;
        this.position = position;
        this.idColec = idColec;
    }
    for (let x = 0; x < mf.length; x++) {

        let mfin = new MovFinanciero(
            mf[x]._id,
            mf[x].num,
            mf[x].origen,
            mf[x].fecha,
            mf[x].unidades,
            mf[x].moneda,
            mf[x].importeDesencadenado,
            mf[x].importeDesencadenadoArs,
            mf[x].importeDesencadenadoUsd,
            mf[x].tc,
            mf[x].tipo,
            mf[x].observaciones,
            mf[x].date,
            mf[x].username,
            mf[x].idDesen,
            mf[x].desen,
            mf[x].position,
            mf[x].idColec

        )
        movimientoFinanciero.push(mfin);
    }
    res.json(movimientoFinanciero);

});
router.get('/movimientoFinancieroSaldo', async (req, res) => {
    let fechaHasta = req.query.fechaHasta

    let unidFidei = /./;


    if ((req.query.unidad != "undefined")) {

        unidFidei = req.query.unidad
    }

    if ((req.query.unidad == "Todos") || (req.query.unidad == "todos") || (req.query.unidad == "")) {

        unidFidei = /./;
    }


    const mf = await MovimientoFinanciero.aggregate([
        {
            $lookup: {
                from: "unidades",
                localField: "unidades",
                foreignField: "_id",
                as: "unidadesMv"
            },
        },
        {
            $lookup: {
                from: "tipopagos",
                localField: "tipoPagos",
                foreignField: "_id",
                as: "tipoPagos"
            }
        },


        {
            $match: {
                "unidadesMv.name": unidFidei,
                fecha: { $lte: new Date(fechaHasta) },
            }
        },


        {
            $group: {

                _id: `$tipoPagos.name`,
                totalArs: { $sum: `$importeDesencadenadoArs` },
                totalUsd: { $sum: `$importeDesencadenadoUsd` },
                tc: { $avg: `$tc` },
            }
        },
    ]);

    res.json(mf);
});
router.get('/movimientoFinancieroNum', async (req, res) => {

    var numerador = await MovimientoFinanciero.find({}, { num: 1, _id: 0 }).sort({ $natural: -1 }).limit(1);;

    res.json(numerador);

});
router.post('/movimientoFinanciero', async (req, res) => {
    try {
        let { unidades, moneda, tipoPago, username } = req.body;

        let keys = Object.keys(req.body);
        let newMovFinFlex = new MovimientoFinanciero({});

        for (let x = 0; x < Object.keys(req.body).length; x++) {

            newMovFinFlex[keys[x]] = req.body[keys[x]]
        }


        const unidadesFound = await Unidades.find({ name: { $in: unidades } });
        newMovFinFlex.unidades = unidadesFound.map((unidad) => unidad._id)
        const pagosFound = await TipoPagos.find({ name: { $in: tipoPago } });
        newMovFinFlex.tipoPagos = pagosFound.map((pago) => pago._id)
        const usersFound = await User.find({ username: { $in: username } });
        newMovFinFlex.username = usersFound.map((user) => user._id)
        const monedaFound = await Moneda.find({ name: { $in: moneda } });
        newMovFinFlex.moneda = monedaFound.map((md) => md._id)

        let MovimientoRealizado = await newMovFinFlex.save();

        res.json({
            mensaje: `El movimiento del fue registrado con exito`,
            posteo: MovimientoRealizado
        });
    } catch (error) {
        console.error(error);
    }
});
router.put('/movimientoFinanciero', async (req, res) => {
    try {
        let { id, unidades, tipoPago, username, moneda, origen } = req.body;
        let keys = Object.keys(req.body);

        let newMovFinFlex = new Object;

        for (let x = 0; x < Object.keys(req.body).length; x++) {

            newMovFinFlex[keys[x]] = req.body[keys[x]]
        }

        const unidadesFound = await Unidades.find({ name: { $in: unidades } });
        newMovFinFlex.unidades = unidadesFound.map((unidad) => unidad._id)
        const pagosFound = await TipoPagos.find({ name: { $in: tipoPago } });
        newMovFinFlex.tipoPagos = pagosFound.map((pago) => pago._id)
        const usersFound = await User.find({ username: { $in: username } });
        newMovFinFlex.username = usersFound.map((user) => user._id)
        const monedaFound = await Moneda.find({ name: { $in: moneda } });
        newMovFinFlex.moneda = monedaFound.map((md) => md._id)
        delete newMovFinFlex.id

        let movFinActDes = await MovimientoFinanciero.findOneAndUpdate({
            id,
        },
            newMovFinFlex);

        res.json({
            mensaje: `El movimiento del fue actualizado con exito`,
            posteo: movFinActDes
        });

    } catch (error) {
        console.error(error);
    }
});
router.put('/movimientoFinancieroDes', async (req, res) => {
    try {
        let { id, unidades, tipoPago, username, moneda, desen, idDesen } =
            req.body;

        let keys = Object.keys(req.body);
        let newMovFinFlex = new Object;


        for (let x = 0; x < Object.keys(req.body).length; x++) {

            newMovFinFlex[keys[x]] = req.body[keys[x]]
        }

        const unidadesFound = await Unidades.find({ name: { $in: unidades } });
        newMovFinFlex.unidades = unidadesFound.map((unidad) => unidad._id)
        const pagosFound = await TipoPagos.find({ name: { $in: tipoPago } });
        newMovFinFlex.tipoPagos = pagosFound.map((pago) => pago._id)
        const usersFound = await User.find({ username: { $in: username } });
        newMovFinFlex.username = usersFound.map((user) => user._id)
        const monedaFound = await Moneda.find({ name: { $in: moneda } });
        newMovFinFlex.moneda = monedaFound.map((md) => md._id)
        delete newMovFinFlex.id

        if (idDesen != "undefined") {
            delete newMovFinFlex.idDesen
        }


        if (desen == `undefined`) {
            let movFinActDesA = await MovimientoFinanciero.findOneAndUpdate({
                idDesen: id,
            },
                newMovFinFlex);
        } else {


            let movFinActDes = await MovimientoFinanciero.findOneAndUpdate({
                desen,
                idDesen: id,
            },
                newMovFinFlex);
        }

        res.json(`El mov financiero por fue actualizado`);

    } catch (error) {
        console.error(error);
    }
});
router.put('/movimientoFinancieroDesColec', async (req, res) => {
    try {
        let { id, unidades, tipoPago, username, moneda, desen, idColec, idDesen, destinoColec } = req.body;
        let keys = Object.keys(req.body);
        let newMovFinFlex = new Object;


        for (let x = 0; x < Object.keys(req.body).length; x++) {

            newMovFinFlex[keys[x]] = req.body[keys[x]]
        }

        const unidadesFound = await Unidades.find({ name: { $in: unidades } });
        newMovFinFlex.unidades = unidadesFound.map((unidad) => unidad._id)
        const pagosFound = await TipoPagos.find({ name: { $in: tipoPago } });
        newMovFinFlex.tipoPagos = pagosFound.map((pago) => pago._id)
        const usersFound = await User.find({ username: { $in: username } });
        newMovFinFlex.username = usersFound.map((user) => user._id)
        const monedaFound = await Moneda.find({ name: { $in: moneda } });
        newMovFinFlex.moneda = monedaFound.map((md) => md._id)
        delete newMovFinFlex.id

        let movFinActDes = await MovimientoFinanciero.findOneAndUpdate({
            idColec,
            desen,
            idDesen,
            origen: destinoColec
        },
            newMovFinFlex);



        res.json(`El mov financiero por fue actualizado`);

    } catch (error) {
        console.error(error);
    }
});
router.delete('/movimientoFinanciero', async (req, res) => {

    let { id } = req.body;

    await MovimientoFinanciero.findByIdAndDelete(id);
    res.json('ok');

});
router.delete('/movimientoFinancieroDes', async (req, res) => {
    try {
        let { idDesen } = req.body;


        const deletemov = await MovimientoFinanciero.deleteOne({ idDesen });
        res.json('ok');
    } catch (error) {
        console.error(error);
    }
});
router.delete('/movimientoFinancieroColec', async (req, res) => {
    try {
        let { id, idColec, destinoColec } = req.body;

        const deletemov = await MovimientoFinanciero.deleteOne({
            idColec,
            idDesen: id,
            origen: destinoColec

        });

        res.json('ok');
    } catch (error) {
        console.error(error);
    }
});
router.get('/proyeccionesCashFlow', async (req, res) => {

    let unidFidei = /./;

    if (req.query.unid != "undefined") {

        unidFidei = req.query.unid
    }

    if ((req.query.unid == "Todos") || (req.query.unid == "todos") || (req.query.unid == "")) {

        unidFidei = /./;
    }

    const pcf = await ProyectadoCash.aggregate([{

        $lookup: {
            from: "unidades",
            localField: "unidades",
            foreignField: "_id",
            as: "unidades"
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "user"
        }
    },
    /* {
         $match: { "unidades.name": unidFidei }
     },*/
    {
        $project: {
            _id: 1,
            identificador: 1,
            previsto: 1,
            gastoReal: 1,
            pagado: 1,
            aPagar: 1,
            meses: 1,
            unidades: "$unidades.name",
            username: "$user.username",
        }
    }
    ]);

    let proyectadoCah = [];
    let ProyectadoCashF = function (_id, identificador, gastoReal, previsto, pagado, aPagar, meses, unidades, username) {
        this.id = _id;
        this.identificador = identificador;
        this.gastoReal = gastoReal;
        this.previsto = previsto;
        this.pagado = pagado;
        this.aPagar = aPagar;
        this.meses = meses;
        this.unidades = unidades;
        this.username = username;

    }
    for (let x = 0; x < pcf.length; x++) {

        let pscashFlow = new ProyectadoCashF(
            pcf[x]._id,
            pcf[x].identificador,
            pcf[x].gastoReal,
            pcf[x].previsto,
            pcf[x].pagado,
            pcf[x].aPagar,
            pcf[x].meses,
            pcf[x].unidades,
            pcf[x].username,
        )
        proyectadoCah.push(pscashFlow);

    }
    res.json(proyectadoCah);

});
router.post('/proyeccionesCashFlow', async (req, res) => {
    try {
        let { identificador, ano, mes, previsto, gastoReal, pagado, aPagar, meses, unidades, username, date } = req.body;

        if (unidades == "") {

            // const usersFound = await User.find({ username: { $in: username } });
            let newProyectadoCash = new ProyectadoCash({
                identificador,
                previsto,
                gastoReal,
                pagado,
                aPagar,
                meses,
                ano,
                mes,
                //username: usersFound.map((user) => user._id),
                date,
            });

            let ProyectadoCashF = await newProyectadoCash.save();

            res.json({
                mensaje: `El movimiento del ${pagado} fue registrado con exito`,
                posteo: ProyectadoCashF
            });

        } else {
            const unidadesFound = await Unidades.find({ name: { $in: unidades } });
            // const usersFound = await User.find({ username: { $in: username } });


            let newProyectadoCash = new ProyectadoCash({
                identificador,
                previsto,
                gastoReal,
                pagado,
                aPagar,
                meses,
                ano,
                mes,
                unidades: unidadesFound.map((unidad) => unidad._id),
                //username: usersFound.map((user) => user._id),
                date,
            });

            let ProyectadoCashF = await newProyectadoCash.save();

            res.json({
                mensaje: `El movimiento del ${pagado} fue registrado con exito`,
                posteo: ProyectadoCashF
            });
        }


    } catch (error) {
        console.error(error);
    }
});
//INDICES
//Icc
router.get('/icc', async (req, res) => {

    const icc = await Icc.aggregate([{
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
            fecha: 1,
            tipoCambio: 1,
            date: 1,
            username: "$User.username"
        }
    }
    ]);

    res.json(icc);

});
router.get('/iccHoy', async (req, res) => {

    let fechaHasta = req.query.fechaHasta


    var ultimoIcc = await Icc.find({ fecha: { $lte: fechaHasta } }, {
        fecha: 1,
        tipoCambio: 1,
        _id: 0

    }).sort({ fecha: -1 }).limit(1);;

    res.json(ultimoIcc);

});
router.post('/icc', async (req, res) => {
    try {
        let { fecha, tipoCambio, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newIcc = new Icc({
            fecha,
            tipoCambio,
            date,
            username: usersFound.map((user) => user._id)

        });

        let icc = await newIcc.save();

        res.json({
            mensaje: `El icc de  ${fecha} fue creado con exito`,
            posteo: icc
        });

    } catch (error) {
        console.error(error);
        res.json(`error`);
    }
});
router.delete('/icc', async (req, res) => {

    let { id } = req.body;

    await Icc.findByIdAndDelete(id);

    res.json("Delete");

})
router.put('/icc', async (req, res) => {
    try {
        let { _id, fecha, tipoCambio, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newIccAct = ({
            fecha,
            tipoCambio,
            date,
            username: usersFound.map((user) => user._id)

        });

        var iccAct = await Icc.findByIdAndUpdate(_id, newIccAct);
        res.json(`El Icc de ${fecha} fue actualizado`);


    } catch (error) {
        console.error(error);
    }
});
//TipoCambio
router.get('/tipoCambio', async (req, res) => {

    const tipoCambio = await TipoCambio.aggregate([{
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
            fecha: 1,
            tipoCambio: 1,
            tipoCambioAlternativo: 1,
            date: 1,
            username: "$User.username"
        }
    }
    ]);

    res.json(tipoCambio);
    con

});
router.get('/tipoCambioHoy', async (req, res) => {

    let fechaHasta = req.query.fechaHasta

    var tipoCambioHoy = await TipoCambio.find({ fecha: { $lte: fechaHasta } }, { fecha: 1, tipoCambio: 1, tipoCambioAlternativo: 1, _id: 0 }).sort({ fecha: -1 }).limit(1);

    res.json(tipoCambioHoy);

});
router.post('/tipoCambio', async (req, res) => {
    try {
        let { fecha, tipoCambio, tipoCambioAlternativo, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newtc = new TipoCambio({
            fecha,
            tipoCambio,
            tipoCambioAlternativo,
            date,
            username: usersFound.map((user) => user._id)

        });

        let tc = await newtc.save();

        res.json({
            mensaje: `El tipo de cambio de ${fecha} fue creado con exito`,
            posteo: tc
        });

    } catch (error) {
        console.error(error);
        res.json(`error`);
    }
});
router.delete('/tipoCambio', async (req, res) => {

    let { id } = req.body;

    await TipoCambio.findByIdAndDelete(id);

    res.json("Delete");

})
router.put('/tipoCambio', async (req, res) => {
    try {
        let { _id, fecha, tipoCambio, tipoCambioAlternativo, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newTc = ({
            fecha,
            tipoCambio,
            tipoCambioAlternativo,
            date,
            username: usersFound.map((user) => user._id)

        });

        var iccAct = await TipoCambio.findByIdAndUpdate(_id, newTc);

        res.json(`El Tipo de Cambio de ${fecha} fue actualizado`);


    } catch (error) {
        console.error(error);
    }
});


module.exports = router;