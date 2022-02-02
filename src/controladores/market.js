const express = require('express');
const router = express.Router();
const session = require("express-session");
const User = require("../models/marketPlace/User");

//Direcciones
const Provincia = require("../models/marketPlace/geografico/Provincia");
const Ciudad = require("../models/marketPlace/geografico/Ciudad");
const Pais = require("../models/marketPlace/geografico/Pais");

router.get('/marketp', (req, res) => {
    res.render('inicio/market');
});
//Usuarios
router.get('/users', async (req, res) => {

    const usuario = await User.aggregate([

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
                name: 1,
                surname: 1,
                email: 1,
                logico: 1,
                username: 1,
                password: 1,
                usuario: "$clienteUser.username",
                date: 1,
                habilitado: 1
            }
        }
    ]);
    var user = [];
    var Usuario = function (id, name, surname, email, logico, username, password, usuario, date, habilitado) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.logico = logico;
        this.usuario = username;
        this.password = password;
        this.username = usuario;
        this.date = date;
        this.habilitado = habilitado;
    }

    for (var x = 0; x < usuario.length; x++) {

        var us = new Usuario(
            usuario[x]._id,
            usuario[x].num,
            usuario[x].surname,
            usuario[x].email,
            usuario[x].logico,
            usuario[x].username,
            usuario[x].password,
            usuario[x].observaciones,
            usuario[x].usuario,
            usuario[x].date,
            usuario[x].habilitado)

        user.push(us);
    }

    res.json(user);
    console.log(user)
});
router.post('/users', async (req, res) => {
    try {
        let { name, surname, email, password, logico, usuario, date, habilitado, username } = req.body;
        let msj = ""
        let userNew = false

        const emailUser = await User.findOne({ email: email });
        const usernameUser = await User.findOne({ username: username });

        if (emailUser) {
            msj = "Ya existe un usuario con el email " + email;

        } else if (usernameUser) {
            msj = "El username " + username +" ya fue registrado";

        } else {    

            const usersFound = await User.find({ username: { $in: username } });
            const newUser = new User({
                name,
                surname,
                piso,
                email,
                password,
                logico,
                username: usuario,
                date,
                usuario: usersFound.map((user) => user._id),
                habilitado

            });
            userNew = await newUser.save();

        }
        res.json({
            mensaje: msj,
            posteo: userNew
        });

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
            cp: 1,
            provincia: `$ciudadProv.name`,
            pais: `$ciudadPais.name`,
            date: 1,
            username: "$User.username",
            habilitado: 1

        }
    }
    ]);

    let ciudad = [];
    var CiudadC = function (id, name, cp, provincia, pais, date, username, habilitado) {
        this.id = id;
        this.name = name;
        this.cp = cp;
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
            ci[x].cp,
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
        let { name, cp, provincia, pais, date, username, habilitado } = req.body;

        const provinciaFound = await Provincia.find({ name: { $in: provincia } });
        const paisFound = await Pais.find({ name: { $in: pais } });
        const usersFound = await User.find({ username: { $in: username } });

        const newCiudad = new Ciudad({
            name,
            cp,
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
        let { id, name, cp, provincia, pais, date, username } = req.body;

        const provinciaFound = await Provincia.find({ name: { $in: provincia } });
        const paisFound = await Pais.find({ name: { $in: pais } });
        const usersFound = await User.find({ username: { $in: username } });

        const newCiudadAct = ({
            name,
            cp,
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