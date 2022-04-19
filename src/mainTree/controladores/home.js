const express = require('express');
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const morgan = require(`morgan`);
const path = require('path');
const multer = require(`multer`)
const { unlink } = require(`fs-extra`)
//MainTree pagos
const RubrosPagos = require("../../models/marketPlace/pagos/RubrosPagos");
const SubRubroPagos = require("../../models/marketPlace/pagos/SubRubroPagos");
//MainTree cliente
const Rubros = require("../../models/marketPlace/cliente/Rubros");
const Unidades = require("../../models/marketPlace/cliente/Unidades");
//Modelo financiero
const TipoPagos = require("../../modelo/models/marketPlace/financiero/TipoPagos");
const Moneda = require("../../modelo/models/marketPlace/financiero/Moneda");
//Modelo terceros
const Cliente = require("../../modelo/models/marketPlace/terceros/Cliente");
const Proveedor = require("../../modelo/models/marketPlace/terceros/Proveedor");
//Modelo
const CobrosRecibidos = require("../../models/home/CobrosRecibidos");
const PagosRealizado = require("../../models/home/PagosRealizados");
const User = require("../../modelo/models/marketPlace/User");

router.get('/cobrosRecibidos', async (req, res) => {
    let unidFidei = /./;

    if (req.query.unid != undefined && req.query.unid != "") {

        unidFidei = req.query.unid
    }

    if ((req.query.unid == "Todos") || (req.query.unid == "todos")) {

        unidFidei = /./;
    }

    const cobranzas = await CobrosRecibidos.aggregate([{
        $lookup: {
            from: "clientes",
            localField: "cliente",
            foreignField: "_id",
            as: "clienteCR",
        }
    },
    {
        $lookup: {
            from: "unidades",
            localField: "unidades",
            foreignField: "_id",
            as: "unidadesCR",
        }
    },
    {
        $lookup: {
            from: "monedas",
            localField: "moneda",
            foreignField: "_id",
            as: "moneda",
        }
    },
    {
        $lookup: {
            from: "tipopagos",
            localField: "tipoPagos",
            foreignField: "_id",
            as: "tipoPagos",
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "cobrosCRUser",
        }
    },
    {
        $match: { "unidadesCR.name": unidFidei }
    },
    {
        $project: {
            _id: 1,
            num: 1,
            unidades: "$unidadesCR.name",
            cliente: "$clienteCR.name",
            moneda: "$moneda.name",
            tipoCambio: 1,
            tipoPagos: "$tipoPagos.name",
            observaciones: 1,
            filename: 1,
            path: 1,
            originalname: 1,
            rubro: 1,
            descripcion: 1,
            importe: 1,
            importeArs: 1,
            importeUsd: 1,
            impuestoUno: 1,
            impuestoUnoArs: 1,
            impuestoUnoUsd: 1,
            importeDos: 1,
            importeDosArs: 1,
            importeDosUsd: 1,
            importeDesencadenado: 1,
            importeDesencadenadoArs: 1,
            importeDesencadenadoUsd: 1,
            username: "$cobrosCRUser.username",
            date: 1,
        }
    }
    ]);

    let cobros = [];
    let CobranzaRecibida = function (num, unidades, fecha, cliente, moneda, tipoCambio, tipoPagos, observaciones, filename, path, originalname, rubro, descripcion, importe, importeArs, importeUsd, impuestoUno, impuestoUnoArs, impuestoUnoUsd, importeDos, importeDosArs, importeDosUsd, importeDesencadenado, importeDesencadenadoArs, importeDesencadenadoUsd, username, id, date) {

        this.num = num;
        this.unidades = unidades;
        this.fecha = fecha;
        this.cliente = cliente;
        this.moneda = moneda;
        this.tipoCambio = tipoCambio;
        this.tipoPago = tipoPagos;
        this.observaciones = observaciones;
        this.adjunto = {
            filename: filename,
            path: path,
            originalname: originalname,
        };
        this.compuestoCobranza = {
            rubro: rubro,
            descripcion: descripcion,
            importe: importe,
            importeArs: importeArs,
            importeUsd: importeUsd,
            impuestoUno: impuestoUno,
            impuestoUnoArs: impuestoUnoArs,
            impuestoUnoUsd: impuestoUnoUsd,
            importeDos: importeDos,
            importeDosArs: importeDosArs,
            importeDosUsd: importeDosUsd
        };
        this.importeDesencadenado = importeDesencadenado;
        this.importeDesencadenadoArs = importeDesencadenadoArs;
        this.importeDesencadenadoUsd = importeDesencadenadoUsd;
        this.username = username;
        this.id = id;
        this.date = date;
    }

    for (let x = 0; x < cobranzas.length; x++) {

        let rubro = [];

        for (var y = 0; y < cobranzas[x].rubro.length; y++) {

            let rubrosFound = await Rubros.find({ _id: { $in: cobranzas[x].rubro[y] } });
            rubro.push(rubrosFound.map((rubr) => rubr.name))
        }

        let cobro = new CobranzaRecibida(
            cobranzas[x].num,
            cobranzas[x].unidades,
            cobranzas[x].fecha,
            cobranzas[x].cliente,
            cobranzas[x].moneda,
            cobranzas[x].tipoCambio,
            cobranzas[x].tipoPagos,
            cobranzas[x].observaciones,
            cobranzas[x].filename,
            cobranzas[x].path,
            cobranzas[x].originalname,
            rubro,
            cobranzas[x].descripcion,
            cobranzas[x].importe,
            cobranzas[x].importeArs,
            cobranzas[x].importeUsd,
            cobranzas[x].impuestoUno,
            cobranzas[x].impuestoUnoArs,
            cobranzas[x].impuestoUnoUsd,
            cobranzas[x].importeDos,
            cobranzas[x].importeDosArs,
            cobranzas[x].importeDosUsd,
            cobranzas[x].importeDesencadenado,
            cobranzas[x].importeDesencadenadoArs,
            cobranzas[x].importeDesencadenadoUsd,
            cobranzas[x].username,
            cobranzas[x]._id,
            cobranzas[x].date)

        cobros.push(cobro);

    }

    res.json(cobros);

});
router.get('/cobrosRecibidosRubro', async (req, res) => {

    let unidFidei = /./;
    let fechaHasta = req.query.fechaHasta
    let fechaDesde = req.query.fechaDesde

    if ((req.query.unidad != "undefined")) {

        unidFidei = req.query.unidad
    }

    if ((req.query.unidad == "Todos") || (req.query.unidad == "todos") || (req.query.unidad == "")) {

        unidFidei = /./;
    }

    const cobranzas = await CobrosRecibidos.aggregate([{
        $lookup: {
            from: "rubros",
            localField: "rubro",
            foreignField: "_id",
            as: "rubroCR"
        }
    },
    {
        $lookup: {
            from: "unidades",
            localField: "unidades",
            foreignField: "_id",
            as: "unidadesCR"
        }
    },

    {
        $match: {
            "unidadesCR.name": unidFidei,
            $and: [{
                fecha: { $gte: new Date(fechaDesde) }
            }, {
                fecha: { $lte: new Date(fechaHasta) }
            }]


        }

    }, {
        $group: {
            _id: { $first: `$rubroCR` },
            totalArs: { $sum: `$importeDesencadenadoArs` },
            totalUsd: { $sum: `$importeDesencadenadoUsd` },
            tc: { $avg: `$tipoCambio` },
        }
    },

    ]);

    res.json(cobranzas);
});
router.post('/cobrosRecibidos', async (req, res) => {
    try {
        let { num, unidades, fecha, cliente, moneda, tipoCambio, tipoPago, observaciones, rubro, descripcion, importe, importeArs, importeUsd, impuestoUno, impuestoUnoArs, impuestoUnoUsd, importeDos, importeDosArs, importeDosUsd, importeDesencadenado, importeDesencadenadoArs, importeDesencadenadoUsd, username, date } = req.body;

        let rubroCobrosArray = []
        if (Array.isArray(rubro)) {

            for (let x = 0; x < rubro.length; x++) {

                let rubrosFound = await Rubros.find({ name: { $in: rubro[x] } });
                rubroCobrosArray.push(rubrosFound.map((rubro) => rubro._id))
            }

        } else {
            let rubrosFound = await Rubros.find({ name: { $in: rubro } });
            rubroCobrosArray.push(rubrosFound.map((rubro) => rubro._id))
        }

        const clientesFound = await Cliente.find({ name: { $in: cliente } });
        const unidadesFound = await Unidades.find({ name: { $in: unidades } });
        const pagosFound = await TipoPagos.find({ name: { $in: tipoPago } });
        const usersFound = await User.find({ username: { $in: username } });
        const monedaFound = await Moneda.find({ name: { $in: moneda } });

        const newCobranzaRec = new CobrosRecibidos({
            num,
            unidades: unidadesFound.map((unidades) => unidades._id),
            fecha,
            cliente: clientesFound.map((cliente) => cliente._id),
            moneda: monedaFound.map((mon) => mon._id),
            tipoCambio,
            tipoPagos: pagosFound.map((pago) => pago._id),
            observaciones,
            filename: req.files.adjunto[0].filename,
            path: '/uploads/' + req.files.adjunto[0].filename,
            originalname: req.files.adjunto[0].originalname,
            rubro: rubroCobrosArray,
            descripcion,
            importe,
            importeArs,
            importeUsd,
            impuestoUno,
            impuestoUnoArs,
            impuestoUnoUsd,
            importeDos,
            importeDosArs,
            importeDosUsd,
            importeDesencadenado,
            importeDesencadenadoArs,
            importeDesencadenadoUsd,
            date,
            username: usersFound.map((user) => user._id),

        });
        let cobroRec = await newCobranzaRec.save();

        res.json({
            mensaje: `La cobranza del cliente ${cliente} fue registrada con exito`,
            posteo: cobroRec
        });
    } catch (error) {
        console.error(error);
    }
});
router.put('/cobrosRecibidos', async (req, res) => {
    try {
        let { id, num, unidades, fecha, cliente, moneda, tipoCambio, tipoPago, observaciones, rubro, descripcion, importe, importeArs, importeUsd, impuestoUno, impuestoUnoArs, impuestoUnoUsd, importeDos, importeDosArs, importeDosUsd, importeDesencadenado, importeDesencadenadoArs, importeDesencadenadoUsd, username, date } = req.body;

        let rubroCobrosArray = []

        if (rubro == undefined) {

            const clientesFound = await Cliente.find({ name: { $in: cliente } });
            const pagosFound = await TipoPagos.find({ name: { $in: tipoPago } });
            const usersFound = await User.find({ username: { $in: username } });
            const monedaFound = await Moneda.find({ name: { $in: moneda } });

            const newCobranzaRecAct = ({
                num,
                fecha,
                cliente: clientesFound.map((cliente) => cliente._id),
                moneda: monedaFound.map((mon) => mon._id),
                tipoCambio,
                tipoPagos: pagosFound.map((pago) => pago._id),
                observaciones,
                date,
                username: usersFound.map((user) => user._id)

            });

            if (req.files[0] != undefined) {

                const newCobranzaRecAdj = ({
                    adjunto: {
                        filename: req.files.filename,
                        path: '/uploads/' + req.files.filename,
                        originalname: req.files.originalname,
                    },
                })


                let cobroRecActAdd = await CobrosRecibidos.findByIdAndUpdate(id, newCobranzaRecAdj);

            }


            var cobroRecAct = await CobrosRecibidos.findByIdAndUpdate(id, newCobranzaRecAct);

            res.json(`La Cobranza del cliente ${cliente} fue actualizada`);
        } else {

            if (Array.isArray(rubro)) {

                for (let x = 0; x < rubro.length; x++) {

                    let rubrosFound = await Rubros.find({ name: { $in: rubro[x] } });
                    rubroCobrosArray.push(rubrosFound.map((rubro) => rubro._id))
                }

            } else {
                let rubrosFound = await Rubros.find({ name: { $in: rubro } });
                rubroCobrosArray.push(rubrosFound.map((rubro) => rubro._id))
            }

            const clientesFound = await Cliente.find({ name: { $in: cliente } });
            const pagosFound = await TipoPagos.find({ name: { $in: tipoPago } });
            const usersFound = await User.find({ username: { $in: username } });
            const monedaFound = await Moneda.find({ name: { $in: moneda } });

            const newCobranzaRecAct = ({
                num,
                fecha,
                cliente: clientesFound.map((cliente) => cliente._id),
                moneda: monedaFound.map((mon) => mon._id),
                tipoCambio,
                tipoPagos: pagosFound.map((pago) => pago._id),
                observaciones,
                rubro: rubroCobrosArray,
                descripcion,
                importe,
                importeArs,
                importeUsd,
                impuestoUno,
                impuestoUnoArs,
                impuestoUnoUsd,
                importeDos,
                importeDosArs,
                importeDosUsd,
                importeDesencadenado,
                importeDesencadenadoArs,
                importeDesencadenadoUsd,
                date,
                username: usersFound.map((user) => user._id)

            });

            if (req.files[0] != undefined) {

                const newCobranzaRecAdj = ({
                    adjunto: {
                        filename: req.files.filename,
                        path: '/uploads/' + req.files.filename,
                        originalname: req.files.originalname,
                    },
                })
                var cobroRecActAdd = await CobrosRecibidos.findByIdAndUpdate(id, newCobranzaRecAdj);
            }

            var cobroRecAct = await CobrosRecibidos.findByIdAndUpdate(id, newCobranzaRecAct);

            res.json(`La Cobranza del cliente ${cliente} fue actualizada`);
        }

    } catch (error) {
        console.error(error);
    }
});
router.delete('/cobrosRecibidos', async (req, res) => {

    let { id } = req.body;

    await CobrosRecibidos.findByIdAndDelete(id);
    res.json('ok');

})
///////////////Pagos Realizados
router.get('/pagosRealizados', async (req, res) => {
    let unidFidei = /./;

    if (req.query.unid != undefined && req.query.unid != "") {

        unidFidei = req.query.unid
    }

    if ((req.query.unid == "Todos") || (req.query.unid == "todos")) {

        unidFidei = /./;
    }


    const pag = await PagosRealizado.aggregate([{
        $lookup: {
            from: "proveedors",
            localField: "proveedor",
            foreignField: "_id",
            as: "pagoProveedor"
        }
    },
    {
        $lookup: {
            from: "unidades",
            localField: "unidades",
            foreignField: "_id",
            as: "unidadesCR"
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
            from: "tipopagos",
            localField: "tipoPagos",
            foreignField: "_id",
            as: "tipoPagos"
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "pagosUser"
        }
    },
    {
        $match: { "unidadesCR.name": unidFidei }
    },
    {
        $project: {
            _id: 1,
            num: 1,
            unidades: "$unidadesCR.name",
            fecha: 1,
            proveedor: "$pagoProveedor.name",
            moneda: `$moneda.name`,
            tipoCambio: 1,
            logico: 1,
            estado: 1,
            fechaDos: 1,
            tipo: "$tipoPagos.name",
            observaciones: 1,
            cantidad: 1,
            rubroPagos: 1,
            subRubroPagos: 1,
            descripcion: 1,
            importe: 1,
            importeArs: 1,
            importeUsd: 1,
            impuestoUno: 1,
            impuestoUnoArs: 1,
            impuestoUnoUsd: 1,
            impuestoDos: 1,
            impuestoDosArs: 1,
            impuestoDosUsd: 1,
            importeDos: 1,
            importeDosArs: 1,
            importeDosUsd: 1,
            filename: 1,
            path: 1,
            originalname: 1,
            importeDesencadenado: 1,
            importeDesencadenadoArs: 1,
            importeDesencadenadoUsd: 1,
            date: 1,
            username: "$pagosUser.username",
        }
    }

    ]);

    var pagos = [];
    var PagoRealizado = function (_id, num, unidades, fecha, proveedor, moneda, tipoCambio, logico, estado, fechaDos, tipo, observaciones, cantidad, rubroPagos, subRubroPagos, descripcion, importe, importeArs, importeUsd, impuestoUno, impuestoUnoArs, impuestoUnoUsd, impuestoDos, impuestoDosArs, impuestoDosUsd, importeDos, importeDosArs, importeDosUsd, filename, path, originalname, importeDesencadenado, importeDesencadenado, importeDesencadenado, date, username) {
        this.id = _id;
        this.num = num;
        this.unidades = unidades;
        this.fecha = fecha;
        this.proveedor = proveedor;
        this.moneda = moneda;
        this.tipoCambio = tipoCambio;
        this.logico = logico;
        this.estado = estado;
        this.fechaDos = fechaDos;
        this.tipoPago = tipo;
        this.observaciones = observaciones;
        this.componenteFiscal = {
            cantidad: cantidad,
            rubroPagos: rubroPagos,
            subRubroPagos: subRubroPagos,
            descripcion: descripcion,
            importe: importe,
            importeArs: importeArs,
            importeUsd: importeUsd,
            impuestoUno: impuestoUno,
            impuestoUnoArs: impuestoUnoArs,
            impuestoUnoUsd: impuestoUnoUsd,
            impuestoDos: impuestoDos,
            impuestoDosArs: impuestoDosArs,
            impuestoDosUsd: impuestoDosUsd,
            importeDos: importeDos,
            importeDosArs: importeDosArs,
            importeDosUsd: importeDosUsd
        }
        this.adjunto = {
            filename: filename,
            path: path,
            originalname: originalname,
        }
        this.importeDesencadenado = importeDesencadenado;
        this.importeDesencadenadoArs = importeDesencadenadoArs;
        this.importeTotalUsd = importeDesencadenadoUsd;
        this.date = date;
        this.username = username;
    }

    for (var x = 0; x < pag.length; x++) {
        let rubro = [];
        let subRubro = [];

        for (var y = 0; y < pag[x].rubroPagos.length; y++) {

            let rubrosFound = await RubrosPagos.find({ _id: { $in: pag[x].rubroPagos[y] } });
            let subRubrosFound = await SubRubroPagos.find({ _id: { $in: pag[x].subRubroPagos[y] } });

            rubro.push(rubrosFound.map((rubro) => rubro.name))
            subRubro.push(subRubrosFound.map((subRubro) => subRubro.name))
        }

        var pago = new PagoRealizado(
            pag[x]._id,
            pag[x].num,
            pag[x].unidades,
            pag[x].fecha,
            pag[x].proveedor,
            pag[x].moneda,
            pag[x].tipoCambio,
            pag[x].logico,
            pag[x].estado,
            pag[x].fechaDos,
            pag[x].tipo,
            pag[x].observaciones,
            pag[x].cantidad,
            rubro,
            subRubro,
            pag[x].descripcion,
            pag[x].importe,
            pag[x].importeArs,
            pag[x].importeUsd,
            pag[x].impuestoUno,
            pag[x].impuestoUnoArs,
            pag[x].impuestoUnoUsd,
            pag[x].impuestoDos,
            pag[x].impuestoDosArs,
            pag[x].impuestoDosUsd,
            pag[x].importeDos,
            pag[x].importeDosArs,
            pag[x].importeDosUsd,
            pag[x].filename,
            pag[x].path,
            pag[x].originalname,
            pag[x].importeDesencadenado,
            pag[x].importeDesencadenadoArs,
            pag[x].importeDesencadenadoUsd,
            pag[x].date,
            pag[x].username
        )
        pagos.push(pago);
    }

    res.json(pagos);
});
router.get('/pagosRealizadosRubro', async (req, res) => {

    let fechaHasta = req.query.fechaHasta
    let fechaDesde = req.query.fechaDesde
    let unidFidei = /./;

    if ((req.query.unidad != "undefined")) {

        unidFidei = req.query.unidad
    }

    if ((req.query.unidad == "Todos") || (req.query.unidad == "todos") || (req.query.unidad == "")) {

        unidFidei = /./;
    }


    const pag = await PagosRealizado.aggregate([{
        $lookup: {
            from: "proveedors",
            localField: "proveedor",
            foreignField: "_id",
            as: "pagoProveedor"
        }
    },
    {
        $lookup: {
            from: "rubrospagos",
            localField: "rubroPagos",
            foreignField: "_id",
            as: "rubroPagoMV"
        }
    },
    {
        $lookup: {
            from: "agrupadorrubropagos",
            localField: "rubroPagoMV.agrupadorRubrosPago",
            foreignField: "_id",
            as: "agrupadorPago"
        }
    },
    {
        $lookup: {
            from: "unidades",
            localField: "unidades",
            foreignField: "_id",
            as: "unidadesCR"
        }
    },

    {
        $match: {
            "unidadesCR.name": unidFidei,
            $and: [{
                fecha: { $gte: new Date(fechaDesde) }
            }, {
                fecha: { $lte: new Date(fechaHasta) }
            }]
        }
    },
    {
        $group: {
            _id: `$agrupadorPago.name`,
            totalArs: { $sum: `$importeDesencadenadoArs` },
            totalUsd: { $sum: `$importeDesencadenadoUsd` },
            // tc: { $avg: `$tc` },
        }
    },
    ]);
    res.json(pag);
});
router.post('/pagosRealizados', async (req, res) => {
    try {
        let { num, unidades, fecha, proveedor, moneda, tipoCambio, logico, estado, fechaDos, tipoPago, observaciones, cantidad, rubroPagos, subRubroPagos, descripcion, importe, importeArs, importeUsd, impuestoUno, impuestoUnoArs, impuestoUnoUsd, impuestoDos, impuestoDosArs, impuestoDosUsd, importeDos, importeDosArs, importeDosUsd, importeDesencadenado, importeDesencadenadoArs, importeDesencadenadoUsd, date, username } = req.body;

        let acopioGuardar = false;

        if (logico == `on`) {
            acopioGuardar = true
        } else {
            acopioGuardar = false
        }

        let rubroPagosArray = []
        let subrubroPagosArray = []
        let filenameAdjunto = []
        let pathAdjunto = []
        let originalNameAdjunto = []

        for (let x = 0; x < req.files.adjunto.length; x++) {

            filenameAdjunto.push(req.files.adjunto[x].filename)
            pathAdjunto.push('/uploads/' + req.files.adjunto[x].filename)
            originalNameAdjunto.push(req.files.adjunto[x].originalname)
        }

        if (Array.isArray(rubroPagos)) {
            for (let x = 0; x < rubroPagos.length; x++) {

                let rubrosFound = await RubrosPagos.find({ name: { $in: rubroPagos[x] } });
                let subRubrosFound = await SubRubroPagos.find({ name: { $in: subRubroPagos[x] } });

                rubroPagosArray.push(rubrosFound.map((rubro) => rubro._id))
                subrubroPagosArray.push(subRubrosFound.map((subRubro) => subRubro._id))

            }

        } else {

            let rubrosFound = await RubrosPagos.find({ name: { $in: rubroPagos } });
            let subRubrosFound = await SubRubroPagos.find({ name: { $in: subRubroPagos } });
            subrubroPagosArray.push(subRubrosFound.map((subRubro) => subRubro._id))
            rubroPagosArray.push(rubrosFound.map((rubro) => rubro._id))
        }
        const unidadesFound = await Unidades.find({ name: { $in: unidades } });
        const proveedorFound = await Proveedor.find({ name: { $in: proveedor } });

        const pagosFound = await TipoPagos.find({ name: { $in: tipoPago } });
        const monedaFound = await Moneda.find({ name: { $in: moneda } });
        const usersFound = await User.find({ username: { $in: username } });


        const newPagoRealizado = new PagosRealizado({
            num,
            unidades: unidadesFound.map((unidades) => unidades._id),
            fecha,
            proveedor: proveedorFound.map((proveedor) => proveedor._id),
            moneda: monedaFound.map((moned) => moned._id),
            tipoCambio,
            tipoPagos: pagosFound.map((pago) => pago._id),
            logico: acopioGuardar,
            estado,
            fechaDos,
            observaciones,
            filename: filenameAdjunto,
            path: pathAdjunto,
            originalname: originalNameAdjunto,
            cantidad,
            rubroPagos: rubroPagosArray,
            subRubroPagos: subrubroPagosArray,
            descripcion,
            importe,
            importeArs,
            importeUsd,
            impuestoUno,
            impuestoUnoArs,
            impuestoUnoUsd,
            impuestoDos,
            impuestoDosArs,
            impuestoDosUsd,
            importeDos,
            importeDosArs,
            importeDosUsd,
            importeDesencadenado,
            importeDesencadenadoArs,
            importeDesencadenadoUsd,
            date,
            username: usersFound.map((user) => user._id),

        });

        let pagoRealizado = await newPagoRealizado.save();

        res.json({
            mensaje: `El pago proveedor ${proveedor} fue registrada con exito`,
            posteo: pagoRealizado
        });
    } catch (error) {
        console.error(error);
    }
});
router.put('/pagosRealizados', async (req, res) => {
    try {
        let { id, unidades, num, proveedor, rubroPagos, subRubroPagos, tipoPago, username, moneda } = req.body;

        let keys = Object.keys(req.body);

        let newPagoReflex = new Object;

        for (let x = 0; x < Object.keys(req.body).length; x++) {

            newPagoReflex[keys[x]] = req.body[keys[x]]
        }

        const proveedorFound = await Proveedor.find({ name: { $in: proveedor } });
        newPagoReflex.proveedor = proveedorFound.map((proveedor) => proveedor._id);
        const rubrosFound = await RubrosPagos.find({ name: { $in: rubroPagos } });
        newPagoReflex.rubro = rubrosFound.map((rubro) => rubro._id);
        const subRubrosFound = await SubRubroPagos.find({ name: { $in: subRubroPagos } });
        newPagoReflex.subRubro = subRubrosFound.map((subRubro) => subRubro._id);
        const pagosFound = await TipoPagos.find({ name: { $in: tipoPago } });
        newPagoReflex.tipoPagos = pagosFound.map((pago) => pago._id)
        const monedaFound = await Moneda.find({ name: { $in: moneda } });
        newPagoReflex.moneda = monedaFound.map((md) => md._id)
        const usersFound = await User.find({ username: { $in: username } });
        newPagoReflex.username = usersFound.map((user) => user._id)

        delete newPagoReflex.id
        delete newPagoReflex.unidades
        delete newPagoReflex.rubroPagos
        delete newPagoReflex.subRubroPagos

        if (req.files.adjunto != undefined) {

            let filenameAdjunto = []
            let pathAdjunto = []
            let originalNameAdjunto = []

            for (let x = 0; x < req.files.adjunto.length; x++) {

                filenameAdjunto.push(req.files.adjunto[x].filename)
                pathAdjunto.push('/uploads/' + req.files.adjunto[x].filename)
                originalNameAdjunto.push(req.files.adjunto[x].originalname)
            }

            newPagoReflex[`filename`] = filenameAdjunto;
            newPagoReflex[`path`] = pathAdjunto;
            newPagoReflex[`originalname`] = originalNameAdjunto
        }

        let pagoAct = await PagosRealizado.findByIdAndUpdate(id, newPagoReflex);
        res.json(`El pago numero ${num} fue actualizado`);

    } catch (error) {
        console.error(error);
    }
});
router.delete('/pagosRealizados', async (req, res) => {

    let { id } = req.body;

    await PagosRealizado.findByIdAndDelete(id);
    res.json('ok');

})
module.exports = router;