const express = require('express')

const router = express.Router()

const adminController = require('../../../controllers/apis/admin-controller')
const upload = require('../../../middleware/multer')
// 刪除特定商品
router.delete('/product/:id', adminController.deleteProduct)
// 瀏覽admin後台列表
router.get('/goodshop', adminController.getGoodshop)
// 新增商品POST
router.post('/product', upload.single('image'), adminController.postProduct)
module.exports = router
