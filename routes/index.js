const express = require('express')
const router = express.Router()

const goodshopController = require('../controllers/pages/goodshop-controller')
const admin = require('./modules/admin')

router.use('/admin/goodshop', admin)

router.get('/goodshop', goodshopController.getGoodshop)

router.use('/', (req, res) => res.redirect('/goodshop'))

module.exports = router
