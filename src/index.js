require(`dotenv`).config()
const express = require("express");
const multer = require(`multer`)
const uuid = require(`uuid`).v4
const path = require('path');
const session = require("express-session");
const flash = require('connect-flash');
const passport = require("passport")
const MongoStore = require(`connect-mongo`)


const MONGO_URL = `mongodb://127.0.0.1:27017/mainTree`


const app = express();
require('./dbConfig');
require('./modelo/lib/passportConfig');


//Settings
const PORT = process.env.PORT || 1000;
const NODE_ENV = process.env.NODE_ENV || `development`;
const IN_PROD = NODE_ENV === `production `;
const SESS_NAME = `sid`

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'modelo/front')));
app.use(express.static(path.join(__dirname, 'mainTree/front')));


const storage = multer.diskStorage({
    destination: path.join(__dirname, 'mainTree/front/uploads'),
    filename: (req, file, cb, filename) => {

        cb(null, uuid() + path.extname(file.originalname));
    }
})

app.use(multer({ storage }).fields([
    { name: `adjunto`, maxCount: 5 },
    { name: `adjuntoColeccion`, maxCount: 20 }
]))

app.use(
    session({
        name: SESS_NAME,

        secret: "secret",// Key we want to keep secret which will encrypt all of our information
        resave: false, // Should we resave our session variables if nothing has changes which we dont
        saveUninitialized: false, // Save empty value if there is no vaue which we do not want to do
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Un Día escrito en milisegundos
            sameSite: true,// Estricto solo guarda cookies del mismo sitio
            secure: IN_PROD
        },
        store: MongoStore.create({
            mongoUrl: MONGO_URL,
            autoReconnect: true
        })
    })
);
// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

app.use(require('./modelo/controladores/inicio'));
app.use(require('./modelo/controladores/home'));
app.use(require('./modelo/controladores/market'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});