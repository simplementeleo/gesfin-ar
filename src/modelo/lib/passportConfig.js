const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/marketPlace/User');
const { LocalStorage } = require('node-localstorage');
let Storage = new LocalStorage('./storage'); 

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
        const isActive = await User.findOne({ username })
        if (isActive.sessionStatus) {
            let update = { sessionStatus: false }
            await User.findOneAndUpdate({ username }, update);
            return done(null, false, { message: 'Ha ocurrido un error, intente nuevamente.' })
        } else if (match) {
            // Update data sessionStatus
            let update = { sessionStatus: true }
            try {
                const status = await User.findOneAndUpdate({ username }, update, {
                    returnOriginal: false
                });
                Storage.setItem('session', user.username);
                console.log(status)
            } catch (err) {
                console.log('Ha ocurrido un error ', err)
            }
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