const express = require('express');
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const morgan = require(`morgan`);
const path = require('path');
const multer = require(`multer`)
const { unlink } = require(`fs-extra`)

const User = require("../models/marketPlace/User");
const Error = require("../models/home/Error");
const Requerimiento = require("../models/home/Requerimiento");

const Tarea = require("../models/marketPlace/procesos/Tarea");
const Estado = require("../models/marketPlace/procesos/Estado");
const Criticidad = require("../models/marketPlace/procesos/Criticidad");
const Cliente = require("../models/marketPlace/cliente/Cliente");

router.post("/users/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true
}));
//hola forro trolo
router.get('/home', (req, res) => {
    res.render('home/homeLog', { userNombre: req.user.name, username: req.user.username });
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



module.exports = router;