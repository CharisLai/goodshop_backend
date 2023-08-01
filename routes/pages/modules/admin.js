const express = require('express')
const router = express.Router()

const adminController = require('../../../controllers/pages/admin-controller')
const upload = require('../../../middleware/multer')

// 瀏覽admin後台列表
router.get('/goodshop', adminController.getGoodshop)
// 新增商品GET
router.get('/product/create', adminController.createProduct)

// 編輯特定商品GET
router.get('/product/:id/edit', adminController.editProduct)
// 瀏覽特定商品
router.get('/product/:id', adminController.getProduct)
// 編輯特定商品PUT
router.put('/product/:id', upload.single('image'), adminController.putProduct)
// 刪除特定商品
router.delete('/product/:id', adminController.deleteProduct)
// 新增商品POST
router.post('/product', upload.single('image'), adminController.postProduct)

router.use('', (req, res) => res.redirect('/goodshop'))

module.exports = router
