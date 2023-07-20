const express = require('express')
const router = express.Router()

const adminController = require('../../../controllers/apis/admin-controller')

// 瀏覽admin後台列表
router.get('/goodshop', adminController.getGoodshop)

module.exports = router
