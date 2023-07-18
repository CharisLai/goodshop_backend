const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/pages/admin-controller')

// 新增商品GET
router.get('/goods/create', adminController.createGoods)
// 編輯特定商品GET
router.get('/goods/:id/edit', adminController.editGoods)
// 瀏覽特定商品
router.get('/goods/:id', adminController.getGoods)
// 編輯特定商品PUT
router.put('/goods/:id', adminController.putGoods)
// 新增商品POST
router.post('/goods', adminController.postGoods)

router.get('/goodshop', adminController.getGoodshop)

router.use('', (req, res) => res.redirect('/admin/goodshop'))

module.exports = router
