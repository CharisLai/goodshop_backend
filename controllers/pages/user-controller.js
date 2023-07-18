const bcrypt = require('bcryptjs')
const db = require('../../models')
const { User } = db

const userController = {
    // 註冊
    signUpPage: (req, res) => {
        res.render('signup')
    },
    signUp: (req, res, next) => {
        // 輸入兩次密碼不相符，建立一個Error物件並拋出
        if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')
        // 確認資料裡 沒有重複的email，所有建立Error並拋出提示使用者
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) throw new Error('Email already exists!')
                return bcrypt.hash(req.body.password, 10)
            })
            .then(hash => User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            }))
            .then(() => {
                req.flash('success_messages', '成功註冊帳號！')
                res.redirect('/login')
            })
            .catch(err => next(err))
    },
    // 登入
    logInPage: (req, res) => {
        res.render('login')
    },
    logIn: (req, res) => {
        req.flash('success_messages', 'Login Success!')
        res.redirect('/goodshop')
    },
    // 登出
    logOut: (req, res, next) => {
        req.logout(function (error) {
            if (error) {
                return next(error)
            }
            req.flash('success_messages', '登出成功！')
            res.redirect('/login')
        })
    }

}
module.exports = userController
