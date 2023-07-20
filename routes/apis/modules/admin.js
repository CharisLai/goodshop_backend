const express = require('express')

const router = express.Router()

const adminController = require('../../../controllers/apis/admin-controller')
const upload = require('../../../middleware/multer')
// 刪除特定商品
router.delete('/goods/:id', adminController.deleteGoods)
// 瀏覽admin後台列表
router.get('/goodshop', adminController.getGoodshop)
// 新增商品POST
router.post('/goods', upload.single('image'), adminController.postGoods)
module.exports = router
