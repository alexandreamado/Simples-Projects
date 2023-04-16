const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function inicialize(passport, getUserByEmail) {
    const authenticateuser = (email, password, done) => {
        const user = getUserByEmail(email) 
        if (user == null) {
            return done(null, false, {message: "No user with that email"})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: "Password incorrect"})
            }
        } catch (e) {
            return done(e)
        }

    } 

    passport.use(new LocalStrategy({ usernameField: 'email' }),
        authenticateuser)
    passport.serializeUser((user, done) => { })
    passport.deserializeUser((id, done) => { })
} 

module.exports = inicialize