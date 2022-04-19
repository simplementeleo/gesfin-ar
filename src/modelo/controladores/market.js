const express = require('express');
const router = express.Router();
const session = require("express-session");
const bcrypt = require("bcrypt");
//Grupo de seguridad
const GrupoSeguridad = require("../models/marketPlace/seguridad/Grupo");
//Terceros
const Cliente = require("../models/marketPlace/terceros/Cliente");
const Proveedor = require("../models/marketPlace/terceros/Proveedor");
//Financiero
const Moneda = require("../models/marketPlace/financiero/Moneda");
const TipoComprobante = require("../models/marketPlace/financiero/TipoComprobante.Js");
const TipoPagos = require("../models/marketPlace/financiero/TipoPagos");
//Procesos
const Estado = require("../models/marketPlace/procesos/Estado");
const Criticidad = require("../models/marketPlace/procesos/Criticidad");
const Tarea = require("../models/marketPlace/procesos/Tarea");
//Direcciones
const Provincia = require("../models/marketPlace/geografico/Provincia");
const Ciudad = require("../models/marketPlace/geografico/Ciudad");
const Pais = require("../models/marketPlace/geografico/Pais");
const User = require("../models/marketPlace/User");

router.get('/marketp', (req, res) => {
    res.render('inicio/market');
});
//Usuarios
router.get('/users', async (req, res) => {

    const usuario = await User.aggregate([

        {
            $lookup: {
                from: "users",
                localField: "usuario",
                foreignField: "_id",
                as: "User"
            }
        },
        {
            $lookup: {
                from: "grupos",
                localField: "grupoSeguridad",
                foreignField: "_id",
                as: "GrupoSeg"
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                surname: 1,
                email: 1,
                password: 1,
                logico: 1,
                grupoSeguridad: "$GrupoSeg.name",
                descripcion: 1,
                username: 1,
                date: 1,
                usuario: "$User.username",
                habilitado: 1
            }
        }
    ]);
    var user = [];
    var Usuario = function (id, name, surname, email, password, logico, grupoSeguridad, descripcion, username, date, usuario, habilitado) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.logico = logico;
        this.gruposDeSeguridad = {
            grupoSeguridad: grupoSeguridad,
            descripcion: descripcion
        };
        this.usuario = username;
        this.date = date;
        this.username = usuario;
        this.habilitado = habilitado;
    }

    for (var x = 0; x < usuario.length; x++) {

        var us = new Usuario(
            usuario[x]._id,
            usuario[x].name,
            usuario[x].surname,
            usuario[x].email,
            usuario[x].password,
            usuario[x].logico,
            usuario[x].grupoSeguridad,
            usuario[x].descripcion,
            usuario[x].username,
            usuario[x].date,
            usuario[x].usuario,
            usuario[x].habilitado)

        user.push(us);
    }
    res.json(user);
});
router.post('/users', async (req, res) => {
    try {
        let { name, surname, email, password, logico, grupoSeguridad, descripcion, usuario, date, habilitado, username } = req.body;

        const grupoFound = await GrupoSeguridad.find({ name: { $in: grupoSeguridad } });
        const usersFound = await User.find({ username: { $in: username } });
        const newUser = new User({
            name,
            surname,
            email,
            password,
            logico,
            grupoSeguridad: grupoFound.map((grupo) => grupo._id),
            descripcion,
            username: usuario,
            date,
            usuario: usersFound.map((user) => user._id),
            habilitado

        });
        newUser.password = await newUser.encryptPassword(password);
        let userNew = await newUser.save();

        res.json({
            mensaje: `El usuario ${usuario}  fue creado con extito`,
            posteo: userNew
        });

    } catch (error) {
        console.error(error);
        res.json(error);

    }
});
router.put('/users', async (req, res) => {
    try {
        let { id, password, usuario, username, grupoSeguridad } = req.body;

        let keys = Object.keys(req.body);

        let newUsersFlex = new Object;

        for (let x = 0; x < Object.keys(req.body).length; x++) {

            newUsersFlex[keys[x]] = req.body[keys[x]]
        }

        const usersFound = await User.find({ username: { $in: username } });
        newUsersFlex.usuario = usersFound.map((user) => user._id)
        const grupoFound = await GrupoSeguridad.find({ name: { $in: grupoSeguridad } });
        newUsersFlex.grupoSeguridad = grupoFound.map((grupo) => grupo._id),
            newUsersFlex.username = usuario;
        delete newUsersFlex.id

        if (password == "******") {
            delete newUsersFlex.password
        } else {

            const salt = await bcrypt.genSalt(10);
            newUsersFlex.password = await bcrypt.hash(password, salt);
        }

        let usersAct = await User.findByIdAndUpdate(id, newUsersFlex);

        res.json({
            mensaje: `El usuario ${usuario}  fue actualizado con extito`,
            posteo: usersAct
        });

    } catch (error) {
        console.error(error);
        res.json(error);

    }
})
router.delete('/users', async (req, res) => {
    let { id, habilitado } = req.body;

    const newUsuarioHab = ({
        habilitado
    });

    let criticidadAct = await User.findByIdAndUpdate(id, newUsuarioHab);

    res.json(`El registro ha sido deshabilitado con exito`);
})
//Alta grupo SEguridad
router.get('/grupoSeguridad', async (req, res) => {

    const grupo = await GrupoSeguridad.aggregate([

        {
            $lookup: {
                from: "users",
                localField: "usuario",
                foreignField: "_id",
                as: "User"
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                cantidad: 1,
                observaciones: 1,
                visualizar: 1,
                crear: 1,
                editar: 1,
                eliminar: 1,
                imprimir: 1,
                limite: 1,
                date: 1,
                username: "$User.username",
                habilitado: 1,

            }
        }
    ]);

    var group = [];
    var GrupoSeg = function (id, name, cantidad, observaciones, visualizar, crear, editar, eliminar, imprimir, limite, date, username, habilitado) {
        this.id = id;
        this.name = name;
        this.cantidad = cantidad;
        this.observaciones = observaciones;
        this.visualizar = visualizar;
        this.crear = crear;
        this.editar = editar;
        this.eliminar = eliminar;
        this.imprimir = imprimir;
        this.limite = limite;
        this.date = date;
        this.username = username;
        this.habilitado = habilitado;
    }

    for (var x = 0; x < grupo.length; x++) {

        var gs = new GrupoSeg(
            grupo[x]._id,
            grupo[x].name,
            grupo[x].cantidad,
            grupo[x].observaciones,
            grupo[x].visualizar,
            grupo[x].crear,
            grupo[x].editar,
            grupo[x].eliminar,
            grupo[x].imprimir,
            grupo[x].limite,
            grupo[x].date,
            grupo[x].username,
            grupo[x].habilitado)

        group.push(gs);
    }

    res.json(group);

});
router.post('/grupoSeguridad', async (req, res) => {
    try {
        let { name, cantidad, observaciones, visualizar, crear, editar, username, eliminar, imprimir, limite, date, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });
        const newGroup = new GrupoSeguridad({
            name,
            cantidad,
            observaciones,
            visualizar,
            crear,
            editar,
            eliminar,
            imprimir,
            limite,
            date,
            username: usersFound.map((user) => user._id),
            habilitado

        });

        let groupNew = await newGroup.save();

        res.json({
            mensaje: `El grupo ${name}  fue creado con extito`,
            posteo: groupNew
        });

    } catch (error) {
        console.error(error);
        res.json(error);

    }
});
router.put('/grupoSeguridad', async (req, res) => {
    try {
        let { id, name, username } = req.body;

        let keys = Object.keys(req.body);
        let newGroupFlex = new Object;

        for (let x = 0; x < Object.keys(req.body).length; x++) {

            newGroupFlex[keys[x]] = req.body[keys[x]]
        }

        const usersFound = await User.find({ username: { $in: username } });
        newGroupFlex.username = usersFound.map((user) => user._id)

        delete newGroupFlex.id

        let groupAct = await GrupoSeguridad.findByIdAndUpdate(id, newGroupFlex);

        res.json({
            mensaje: `El grupo de seguridad ${name} fue actualizado con extito`,
            posteo: groupAct
        });

    } catch (error) {
        console.error(error);
        res.json(error);
    }
})
router.put('/grupoSeguridadDoble', async (req, res) => {
    try {
        let { id, name, username } = req.body

        let keys = Object.keys(req.body);

        const usersFound = await User.find({ username: { $in: username } });
        let grupoDeSeguridad = new Object

        for (let x = 0; x < Object.keys(req.body).length; x++) {

            let nameSplit = keys[x].split(" ");

            if (nameSplit.length > 1) {
                if (grupoDeSeguridad[nameSplit[0]] == undefined) {

                    grupoDeSeguridad[nameSplit[0]] = new Object
                    grupoDeSeguridad[nameSplit[0]][nameSplit[1]] = []
                    grupoDeSeguridad[nameSplit[0]][nameSplit[1]].push(req.body[keys[x]])

                } else {
                    grupoDeSeguridad[nameSplit[0]][nameSplit[1]] = []
                    grupoDeSeguridad[nameSplit[0]][nameSplit[1]].push(req.body[keys[x]])
                }

            } else {

                grupoDeSeguridad[keys[x]] = req.body[keys[x]]
            }
        }

        grupoDeSeguridad.username = usersFound.map((user) => user._id)

        let groupAct = await GrupoSeguridad.findByIdAndUpdate(id, grupoDeSeguridad);

        res.json({
            mensaje: `El grupo de seguridad ${name} fue actualizado con extito`,
            posteo: groupAct
        });

    } catch (error) {
        console.error(error);
        res.json(error);

    }
})
router.delete('/grupoSeguridad', async (req, res) => {
    let { id, habilitado } = req.body;

    const newGroupHab = ({
        habilitado
    });

    let groipAct = await GrupoSeguridad.findByIdAndUpdate(id, newGroupHab);

    res.json(`El grupo ha sido deshabilitado con exito`);
})
//Cliente
router.get('/cliente', async (req, res) => {

    const client = await Cliente.aggregate([{
        $lookup: {
            from: "ciudads",
            localField: "ciudad",
            foreignField: "_id",
            as: "clienteCiudad"
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "clienteUser"
        }
    },
    {
        $project: {
            _id: 1,
            num: 1,
            name: 1,
            documento: 1,
            telefono: 1,
            email: 1,
            direccion: 1,
            ciudad: "$clienteCiudad.name",
            observaciones: 1,
            username: "$clienteUser.username",
            date: 1,
            habilitado: 1
        }
    }

    ]);
    var cliente = [];
    var ClienteO = function (id, num, name, documento, telefono, email, direccion, ciudad, observaciones, username, date, habilitado) {
        this.id = id;
        this.num = num;
        this.name = name;
        this.documento = documento;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.observaciones = observaciones;
        this.username = username;
        this.date = date;
        this.habilitado = habilitado;
    }

    for (var x = 0; x < client.length; x++) {


        var clientess = new ClienteO(
            client[x]._id,
            client[x].num,
            client[x].name,
            client[x].documento,
            client[x].telefono,
            client[x].email,
            client[x].direccion,
            client[x].ciudad,
            client[x].observaciones,
            client[x].username,
            client[x].date,
            client[x].habilitado)

        cliente.push(clientess);

    }
    res.json(cliente);
});
router.post('/cliente', async (req, res) => {
    try {
        let { num, name, documento, telefono, email, direccion, ciudad, observaciones, username, date, habilitado } = req.body;

        const ciudadFound = await Ciudad.find({ name: { $in: ciudad } });
        const usersFound = await User.find({ username: { $in: username } });

        const newCliente = new Cliente({
            num,
            name,
            documento,
            telefono,
            email,
            direccion,
            ciudad: ciudadFound.map((ciudad) => ciudad._id),
            observaciones,
            date,
            username: usersFound.map((user) => user._id),
            habilitado

        });

        let cliente = await newCliente.save();

        res.json({
            mensaje: `El cliente "${name}" fue creado con exito`,
            posteo: cliente
        });


    } catch (error) {
        console.error(error);
    }
});
router.delete('/cliente', async (req, res) => {

    let { id, habilitado } = req.body;

    const clienteHab = ({
        habilitado
    });


    let clienteh = await Cliente.findByIdAndUpdate(id, clienteHab)

    res.json(`El registro ha sido deshabilitado con exito`);

})
router.put('/cliente', async (req, res) => {
    try {
        let { id, name, unidades, tipoUnidad, ciudad, tipoPago, username } = req.body;

        let keys = Object.keys(req.body);
        let newClientetAct = new Object;

        for (let x = 0; x < Object.keys(req.body).length; x++) {

            newClientetAct[keys[x]] = req.body[keys[x]]
        }


        const usersFound = await User.find({ username: { $in: username } });
        newClientetAct.username = usersFound.map((user) => user._id)
        const ciudadFound = await Ciudad.find({ name: { $in: ciudad } });
        newClientetAct.ciudad = ciudadFound.map((ciud) => ciud._id)
        delete newClientetAct.id

        let cliente = await Cliente.findByIdAndUpdate(id, newClientetAct)
        res.json(`El cliente "${name}" fue actualizado con exito`)

    } catch (error) {
        console.error(error);
    }
});
router.get('/proveedor', async (req, res) => {

    const pro = await Proveedor.aggregate([{

        $lookup: {
            from: "ciudads",
            localField: "ciudad",
            foreignField: "_id",
            as: "proveedorCiudad"
        }
    },
    {
        $lookup: {
            from: "tipopagos",
            localField: "tipoPago",
            foreignField: "_id",
            as: "proveedorPago"
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "proveedorUser"
        }
    },
    {
        $project: {
            _id: 1,
            num: 1,
            name: 1,
            lastName: 1,
            razon: 1,
            documento: 1,
            telefono: 1,
            email: 1,
            direccion: 1,
            ciudad: "$proveedorCiudad.name",
            tipoPago: "$proveedorPago.name",
            observaciones: 1,
            username: "$proveedorUser.username",
            date: 1,
            habilitado: 1
        }
    }
    ]);
    var proveedor = [];
    var Prov = function (id, num, name, documento, telefono, email, direccion, ciudad, tipoPago, observaciones, username, date, habilitado) {
        this.id = id;
        this.num = num;
        this.name = name;
        this.documento = documento;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.tipoPago = tipoPago;
        this.observaciones = observaciones;
        this.username = username;
        this.date = date;
        this.habilitado = habilitado;
    }
    for (var x = 0; x < pro.length; x++) {

        var prov = new Prov(
            pro[x]._id,
            pro[x].num,
            pro[x].name,
            pro[x].documento,
            pro[x].telefono,
            pro[x].email,
            pro[x].direccion,
            pro[x].ciudad,
            pro[x].tipoPago,
            pro[x].observaciones,
            pro[x].username,
            pro[x].date,
            pro[x].habilitado
        )

        proveedor.push(prov);

    }
    res.json(proveedor);
});
router.post('/proveedor', async (req, res) => {
    try {
        let { num, name, documento, telefono, email, direccion, ciudad, tipoPago, observaciones, username, date, habilitado } = req.body;

        const ciudadFound = await Ciudad.find({ name: { $in: ciudad } });
        const pagosFound = await TipoPagos.find({ name: { $in: tipoPago } });
        const usersFound = await User.find({ username: { $in: username } });

        const newProveedor = new Proveedor({
            num,
            name,
            documento,
            telefono,
            email,
            direccion,
            ciudad: ciudadFound.map((ciudad) => ciudad._id),
            tipoPago: pagosFound.map((pago) => pago._id),
            observaciones,
            date,
            username: usersFound.map((user) => user._id),
            habilitado

        });

        let proveedor = await newProveedor.save();


        res.json({
            mensaje: `El proveedor ${name} fue creado con exito`,
            posteo: proveedor
        });

    } catch (error) {
        console.error(error);
    }
});
router.delete('/proveedor', async (req, res) => {

    let { id, habilitado } = req.body;

    const proveedorHab = ({
        habilitado
    });

    let proveedorh = await Proveedor.findByIdAndUpdate(id, proveedorHab);
    res.json(`El registro ha sido deshabilitado con exito`);

})
router.put('/proveedor', async (req, res) => {
    try {
        let { id, num, name, documento, telefono, email, direccion, ciudad, tipoPago, observaciones, date, username } = req.body;

        const ciudadFound = await Ciudad.find({ name: { $in: ciudad } });
        const pagosFound = await TipoPagos.find({ name: { $in: tipoPago } });
        const usersFound = await User.find({ username: { $in: username } });

        const newProveedorAct = ({
            num,
            name,
            documento,
            telefono,
            email,
            direccion,
            ciudad: ciudadFound.map((ciudad) => ciudad._id),
            tipoPago: pagosFound.map((pago) => pago._id),
            observaciones,
            date,
            username: usersFound.map((user) => user._id),

        });

        let proveedorAct = await Proveedor.findByIdAndUpdate(id, newProveedorAct);

        res.json(`EL proveedor ${name} fue actualizado`);
    } catch (error) {
        console.error(error);
    }
});
//Procesos
router.get('/criticidad', async (req, res) => {

    const criticidad = await Criticidad.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "tipoUser"
        }
    },
    {
        $project: {
            _id: 1,
            orden: 1,
            name: 1,
            date: 1,
            username: "$tipoUser.username",
            habilitado: 1
        }
    }
    ]);

    res.json(criticidad);

});
router.post('/criticidad', async (req, res) => {
    try {
        let { orden, name, date, username, habilitado } = req.body

        const usersFound = await User.find({ username: { $in: username } });

        const newCriticidad = new Criticidad({
            orden,
            name,
            date,
            username: usersFound.map((user) => user._id),
            habilitado
        });

        let criticidad = await newCriticidad.save();

        res.json({
            mensaje: `La criticidad de procesos ${name} fue creada con exito`,
            posteo: criticidad
        });

    } catch (error) {
        console.error(error);
        res.json(`error`);
    }
});
router.delete('/criticidad', async (req, res) => {

    let { id, habilitado } = req.body;

    const newCriticidadHab = ({
        habilitado
    });

    let criticidadAct = await Criticidad.findByIdAndUpdate(id, newCriticidadHab);

    res.json(`El registro ha sido deshabilitado con exito`);
})
router.put('/criticidad', async (req, res) => {
    try {
        let { _id, name, date, orden, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newEstadoAct = ({
            orden,
            name,
            date,
            username: usersFound.map((user) => user._id)

        });

        var estadocAct = await Criticidad.findByIdAndUpdate(_id, newEstadoAct);
        res.json(`EL Estado de proceso ${name} fue actualizado`);


    } catch (error) {
        console.error(error);
    }
});
router.get('/estadoProceso', async (req, res) => {

    const estado = await Estado.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "tipoUser"
        }
    },
    {
        $project: {
            _id: 1,
            orden: 1,
            name: 1,
            date: 1,
            username: "$tipoUser.username",
            habilitado: 1

        }
    }
    ]);

    res.json(estado);

});
router.post('/estadoProceso', async (req, res) => {
    try {
        let { orden, name, date, username, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newEstado = new Estado({
            orden,
            name,
            date,
            username: usersFound.map((user) => user._id),
            habilitado
        });

        let estado = await newEstado.save();

        res.json({
            mensaje: `El Estado de procesos ${name} fue creado con exito`,
            posteo: estado
        });

    } catch (error) {
        console.error(error);
        res.json(`error`);
    }
});
router.delete('/estadoProceso', async (req, res) => {

    let { id, habilitado } = req.body;

    const newEstadoHab = ({
        habilitado
    });

    let estadoAct = await Estado.findByIdAndUpdate(id, newEstadoHab);

    res.json(`El registro ha sido deshabilitado con exito`);
})
router.put('/estadoProceso', async (req, res) => {
    try {
        let { _id, name, date, orden, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newEstadoAct = ({
            orden,
            name,
            date,
            username: usersFound.map((user) => user._id)

        });

        var estadocAct = await Estado.findByIdAndUpdate(_id, newEstadoAct);
        res.json(`EL Estado de proceso ${name} fue actualizado`);


    } catch (error) {
        console.error(error);
    }
});
router.get('/tarea', async (req, res) => {

    const tarea = await Tarea.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "tipoUser"
        }
    },
    {
        $project: {
            _id: 1,
            orden: 1,
            name: 1,
            date: 1,
            username: "$tipoUser.username",
            habilitado: 1

        }
    }
    ]);

    res.json(tarea);

});
router.post('/tarea', async (req, res) => {
    try {
        let { orden, name, date, username, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newTarea = new Tarea({
            orden,
            name,
            date,
            username: usersFound.map((user) => user._id),
            habilitado
        });

        let tarea = await newTarea.save();

        res.json({
            mensaje: `El Estado de procesos ${name} fue creado con exito`,
            posteo: tarea
        });

    } catch (error) {
        console.error(error);
        res.json(`error`);
    }
});
router.delete('/tarea', async (req, res) => {

    let { id, habilitado } = req.body;

    const newTareaHab = ({
        habilitado
    });

    let tareaAct = await Tarea.findByIdAndUpdate(id, newTareaHab);

    res.json(`El registro ha sido deshabilitado con exito`);
})
router.put('/tarea', async (req, res) => {
    try {
        let { _id, name, date, username, orden } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newTareaAct = ({
            orden,
            name,
            date,
            username: usersFound.map((user) => user._id)
        });

        var tareaAct = await Tarea.findByIdAndUpdate(_id, newTareaAct);
        res.json(`La tarea de proceso ${name} fue actualizada`);


    } catch (error) {
        console.error(error);
    }
});
//Direcciones
router.get('/pais', async (req, res) => {

    const paises = await Pais.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "tipoUser"
        }
    },
    {
        $project: {
            _id: 1,
            name: 1,
            date: 1,
            username: "$tipoUser.username",
            habilitado: 1
        }
    }
    ]);

    res.json(paises);

});
router.post('/pais', async (req, res) => {
    try {
        let { name, date, username, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newPais = new Pais({
            name,
            date,
            username: usersFound.map((user) => user._id),
            habilitado
        });

        let pais = await newPais.save();

        res.json({
            mensaje: `El pais ${name} fue creado con exito`,
            posteo: pais
        });

    } catch (error) {
        console.error(error);
        res.json(`error`);
    }
});
router.delete('/pais', async (req, res) => {

    let { id, habilitado } = req.body;

    const newPaisHab = ({
        habilitado
    });

    let cobroRecAct = await Pais.findByIdAndUpdate(id, newPaisHab);

    res.json(`El registro ha sido deshabilitado con exito`);
})
router.put('/pais', async (req, res) => {
    try {
        let { _id, name, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newPaisAct = ({
            name,
            date,
            username: usersFound.map((user) => user._id)

        });

        var cobroRecAct = await Pais.findByIdAndUpdate(_id, newPaisAct);
        res.json(`EL pais ${name} fue actualizado`);


    } catch (error) {
        console.error(error);
    }
});
router.get('/provincia', async (req, res) => {

    const prov = await Provincia.aggregate([{
        $lookup: {
            from: "pais",
            localField: "pais",
            foreignField: "_id",
            as: "paisa"
        }
    }, {
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
            name: 1,
            pais: `$paisa.name`,
            date: 1,
            username: "$User.username",
            habilitado: 1
        }
    }
    ]);
    let provincia = [];
    var ProvinciaC = function (id, name, pais, date, username, habilitado) {
        this.id = id;
        this.name = name;
        this.pais = pais;
        this.date = date;
        this.username = username;
        this.habilitado = habilitado;
    }

    for (var x = 0; x < prov.length; x++) {

        var provi = new ProvinciaC(
            prov[x]._id,
            prov[x].name,
            prov[x].pais,
            prov[x].date,
            prov[x].username,
            prov[x].habilitado)

        provincia.push(provi);
    }
    res.json(provincia);

});
router.post('/provincia', async (req, res) => {
    try {
        let { name, pais, date, username, habilitado } = req.body;

        const paisesFound = await Pais.find({ name: { $in: pais } });
        const usersFound = await User.find({ username: { $in: username } });
        const newProvincia = new Provincia({
            name,
            pais: paisesFound.map((pais) => pais._id),
            date,
            username: usersFound.map((user) => user._id),
            habilitado
        });

        let provincia = await newProvincia.save();


        res.json({
            mensaje: `La provincia de ${name} fue creada con exito`,
            posteo: provincia
        });

    } catch (error) {
        console.error(error);
    }
});
router.delete('/provincia', async (req, res) => {

    let { id, habilitado } = req.body;

    const newProvinciadHab = ({
        habilitado
    });

    let PrvRecAct = await Provincia.findByIdAndUpdate(id, newProvinciadHab);

    res.json(`El registro ha sido deshabilitado con exito`);

})
router.put('/provincia', async (req, res) => {
    try {
        let { id, name, pais, date, username } = req.body;

        const paisFound = await Pais.find({ name: { $in: pais } });
        const usersFound = await User.find({ username: { $in: username } });


        const newProvinciaAct = ({
            name,
            pais: paisFound.map((pai) => pai._id),
            date,
            username: usersFound.map((user) => user._id)

        });

        var provMod = await Provincia.findByIdAndUpdate(id, newProvinciaAct);

        res.json(`La Provincia de ${name} fue actualizada`);


    } catch (error) {
        console.error(error);
    }
});
//Financiero
//Moneda
router.get('/moneda', async (req, res) => {

    const monedas = await Moneda.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "tipoUser"
        }
    },
    {
        $project: {
            _id: 1,
            name: 1,
            abrev: 1,
            date: 1,
            username: "$tipoUser.username",
            habilitado: 1,

        }
    }
    ]);

    res.json(monedas);

});
router.post('/moneda', async (req, res) => {
    try {
        let { name, abrev, date, username, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newMoneda = new Moneda({
            name,
            abrev,
            date,
            username: usersFound.map((user) => user._id),
            habilitado

        });

        let moneda = await newMoneda.save();

        res.json({
            mensaje: `La moneda ${name} fue creado con exito`,
            posteo: moneda
        });

    } catch (error) {
        console.error(error);
        res.json(`error`);
    }
});
router.delete('/moneda', async (req, res) => {

    let { id, habilitado } = req.body;

    const monedaHab = ({
        habilitado
    });


    let monedaRecHab = await Moneda.findByIdAndUpdate(id, monedaHab);

    res.json("Delete");

})
router.put('/moneda', async (req, res) => {
    try {
        let { _id, name, abrev, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newMonAct = ({
            name,
            abrev,
            date,
            username: usersFound.map((user) => user._id)

        });

        let monedaRecAct = await Moneda.findByIdAndUpdate(_id, newMonAct);
        res.json(`La moneda ${name} fue actualizada`);


    } catch (error) {
        console.error(error);
        res.json(`error`);
    }
});
router.get('/tipoPago', async (req, res) => {

    const tipoPago = await TipoPagos.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "tipoPagoUser"
        }
    },
    {
        $project: {
            _id: 1,
            name: 1,
            date: 1,
            username: "$tipoPagoUser.username",
            habilitado: 1
        }
    }
    ]);
    res.json(tipoPago);

});
router.delete('/tipoPago', async (req, res) => {

    let { id, habilitado } = req.body;

    const tipoPagoHab = ({
        habilitado
    });

    let tipoAct = await TipoPagos.findByIdAndUpdate(id, tipoPagoHab);

    res.json(`El registro ha sido deshabilitado con exito`);

})
router.put('/tipoPago', async (req, res) => {
    try {
        let { _id, name, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });


        const newTipo = ({
            name,
            date,
            username: usersFound.map((user) => user._id)

        });

        var tipoAct = await TipoPagos.findByIdAndUpdate(_id, newTipo);
        res.json(`La forma de pago ${name} fue actualizada`);


    } catch (error) {
        console.error(error);
    }
});
router.post('/tipoPago', async (req, res) => {
    try {
        let { name, date, username, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newTipoPagos = new TipoPagos({
            name,
            date,
            username: usersFound.map((user) => user._id),
            habilitado
        });

        let tipoPagos = await newTipoPagos.save();

        res.json({
            mensaje: `La forma de pago "${name}" fue creada con exito`,
            posteo: tipoPagos
        });

    } catch (error) {
        console.error(error);
    }
});
router.get('/tipoComprobante', async (req, res) => {

    const tipoFac = await TipoComprobante.aggregate([{
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "tipoUser"
        }
    },
    {
        $project: {
            _id: 1,
            letraComprobante: 1,
            name: 1,
            date: 1,
            username: "$tipoUser.username",
            habilitado: 1
        }
    }
    ]);

    res.json(tipoFac);

});
router.post('/tipoComprobante', async (req, res) => {
    try {
        let { letraComprobante, name, date, username, habilitado } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newTipoFac = new TipoComprobante({
            letraComprobante,
            name,
            date,
            username: usersFound.map((user) => user._id),
            habilitado

        });


        let tipoComp = await newTipoFac.save();

        res.json({
            mensaje: `El tipo de comprobante ${letraComprobante} fue creado con exito`,
            posteo: tipoComp
        });
    } catch (error) {
        console.error(error);
        res.json(`error`);
    }
});
router.delete('/tipoComprobante', async (req, res) => {

    let { id, habilitado } = req.body;


    const newTipoFacHab = ({
        habilitado
    })

    let tipoCompAct = await TipoComprobante.findByIdAndUpdate(id, newTipoFacHab);

    res.json(`El registro ha sido deshabilitado con exito`);
})
router.put('/tipoComprobante', async (req, res) => {
    try {
        let { _id, letraComprobante, name, date, username } = req.body;

        const usersFound = await User.find({ username: { $in: username } });

        const newTipoFac = ({
            letraComprobante,
            name,
            date,
            username: usersFound.map((user) => user._id)

        });

        var monedaRecAct = await TipoComprobante.findByIdAndUpdate(_id, newTipoFac);
        res.json(`El tipo de comprobante ${letraComprobante} fue actualizada`);


    } catch (error) {
        console.error(error);
        res.json(`error`);
    }
});
//geografico
router.get('/ciudad', async (req, res) => {

    const ci = await Ciudad.aggregate([{
        $lookup: {
            from: "provincias",
            localField: "provincia",
            foreignField: "_id",
            as: "ciudadProv"
        }
    },
    {
        $lookup: {
            from: "pais",
            localField: "pais",
            foreignField: "_id",
            as: "ciudadPais"
        }
    }, {
        $lookup: {
            from: "users",
            localField: "username",
            foreignField: "_id",
            as: "User",

        }
    }, {
        $project: {
            _id: 1,
            name: 1,
            abrev: 1,
            provincia: `$ciudadProv.name`,
            pais: `$ciudadPais.name`,
            date: 1,
            username: "$User.username",
            habilitado: 1

        }
    }
    ]);

    let ciudad = [];
    var CiudadC = function (id, name, abrev, provincia, pais, date, username, habilitado) {
        this.id = id;
        this.name = name;
        this.abrev = abrev;
        this.provincia = provincia;
        this.pais = pais;
        this.date = date;
        this.username = username;
        this.habilitado = habilitado;

    }
    for (var x = 0; x < ci.length; x++) {

        var ciud = new CiudadC(
            ci[x]._id,
            ci[x].name,
            ci[x].abrev,
            ci[x].provincia,
            ci[x].pais,
            ci[x].date,
            ci[x].username,
            ci[x].habilitado)

        ciudad.push(ciud);
    }
    res.json(ciudad);
});
router.post('/ciudad', async (req, res) => {
    try {
        let { name, abrev, provincia, pais, date, username, habilitado } = req.body;

        const provinciaFound = await Provincia.find({ name: { $in: provincia } });
        const paisFound = await Pais.find({ name: { $in: pais } });
        const usersFound = await User.find({ username: { $in: username } });

        const newCiudad = new Ciudad({
            name,
            abrev,
            provincia: provinciaFound.map((provincia) => provincia._id),
            pais: paisFound.map((pais) => pais._id),
            date,
            username: usersFound.map((user) => user._id),
            habilitado
        });


        let ciudad = await newCiudad.save();

        res.json({
            mensaje: `La ciudad de ${name} fue creada con exito`,
            posteo: ciudad
        });



    } catch (error) {
        console.error(error);
        res.json(`error`);
    }
});
router.delete('/ciudad', async (req, res) => {

    let { id, habilitado } = req.body;

    const newCiudadHab = ({
        habilitado
    });

    let cobroRecAct = await Ciudad.findByIdAndUpdate(id, newCiudadHab);

    res.json(`El registro ha sido deshabilitado con exito`);

})
router.put('/ciudad', async (req, res) => {

    try {
        let { id, name, abrev, provincia, pais, date, username } = req.body;

        const provinciaFound = await Provincia.find({ name: { $in: provincia } });
        const paisFound = await Pais.find({ name: { $in: pais } });
        const usersFound = await User.find({ username: { $in: username } });

        const newCiudadAct = ({
            name,
            abrev,
            provincia: provinciaFound.map((provincia) => provincia._id),
            pais: paisFound.map((pais) => pais._id),
            date,
            username: usersFound.map((user) => user._id)
        });

        let cobroRecAct = await Ciudad.findByIdAndUpdate(id, newCiudadAct);

        res.json(`La ciudad de ${name} fue actualizada`);


    } catch (error) {
        console.error(error);
    }
});

module.exports = router;