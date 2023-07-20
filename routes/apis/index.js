const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const goodshopController = require('../../controllers/apis/goodshop-controller')

router.use('/admin', admin)
// goodshop前台
router.get('/goodshop', goodshopController.getGoodshop)

module.exports = router
