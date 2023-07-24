const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const { User, Product } = require('../models')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// set up Passport strategy
passport.use(new LocalStrategy(
    // customize user field
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    // authenticate user
    (req, email, password, cb) => {
        User.findOne({ where: { email } })
            .then(user => {
                if (!user) return cb(null, false, req.flash('error_messages', '沒有此使用帳號，請進行註冊'))
                bcrypt.compare(password, user.password).then(res => {
                    if (!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
                    return cb(null, user)
                })
            })
    }
))

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}
passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
    User.findByPk(jwtPayload.id)
        .then(user => cb(null, user))
        .catch(err => cb(err))
}))
// serialize and deserialize user
passport.serializeUser((user, cb) => {
    cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
    User.findByPk(id).then(user => {
        user = user.toJSON()
        return cb(null, user)
    })
})
module.exports = passport
