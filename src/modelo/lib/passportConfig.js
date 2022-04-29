const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { LocalStorage } = require('node-localstorage');
const User = require('../models/marketPlace/User');
let Storage = new LocalStorage('./storage'); 
function getServerIp() {
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var values = Object.keys(ifaces).map(function(name) {
        return ifaces[name];
    });
    values = [].concat.apply([], values).filter(function(val){ 
        return val.family == 'IPv4' && val.internal == false; 
    });
    return values.length ? values[0].address : '0.0.0.0';
}

passport.use(new LocalStrategy({
    usernameField: 'username'
}, async (username, password, done) => {
    // Match Email's User
    const user = await User.findOne({ username: username });
    if (!user) {
        return done(null, false, { message: 'Usuario no registrado' });
    } else if (!user.habilitado) {
        return done(null, false, { message: 'Usuario deshabilitado' });
    } else {
        // Match Password's User
        const match = await user.matchPassword(password);
        const IPv4 =  getServerIp();
        const session = Storage.getItem('session');
        if (session == user.username && IPv4 == IPv4) Storage.removeItem('session')
        if (session == user.username && IPv4 == IPv4) {
            return done(null, false, { message: 'Ya tiene una sesión abierta. Intente nuevamente, su sesión se ha cerrado.' })
        } else if (match) {
            Storage.setItem('session', user.username);
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});