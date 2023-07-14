const express = require('express')
const router = express.Router()

const goodshopController = require('../controllers/pages/goodshop-controller')
const userController = require('../controllers/pages/user-controller')
const admin = require('./modules/admin')

// admin後台
router.use('/admin/goodshop', admin)

// signUp註冊
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

// goodshop前台
router.get('/goodshop', goodshopController.getGoodshop)

router.use('/', (req, res) => res.redirect('/goodshop'))

module.exports = router
