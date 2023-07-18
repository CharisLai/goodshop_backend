const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/pages/admin-controller')

// 新增商品
router.get('/goodshop/create', adminController.createGoodshop)
// 瀏覽特定商品
router.get('/goods/:id', adminController.getGoods)

router.post('/goodshop', adminController.postGoodshop)

router.get('/goodshop', adminController.getGoodshop)

router.use('', (req, res) => res.redirect('/admin/goodshop'))

module.exports = router
