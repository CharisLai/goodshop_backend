const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/pages/admin-controller')
const { authenticatedAdmin } = require('../../middleware/auth')

router.get('/goodshop', authenticatedAdmin, adminController.getGoodshop)

router.use('', (req, res) => res.redirect('/admin/goodshop'))

module.exports = router
