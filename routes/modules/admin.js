const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/pages/admin-controller')

router.get('/', adminController.getGoodshop)

router.use('/', (req, res) => res.redirect('/admin/goodshop'))

module.exports = router
