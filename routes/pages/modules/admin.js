const express = require('express')
const router = express.Router()

const adminController = require('../../../controllers/pages/admin-controller')
const upload = require('../../../middleware/multer')

// 新增商品GET
router.get('/goods/create', adminController.createGoods)
// 編輯特定商品GET
router.get('/goods/:id/edit', adminController.editGoods)
// 瀏覽特定商品
router.get('/goods/:id', adminController.getGoods)
// 編輯特定商品PUT
router.put('/goods/:id', upload.single('image'), adminController.putGoods)
// 刪除特定商品
router.delete('/goods/:id', adminController.deleteGoods)
// 新增商品POST
router.post('/goods', upload.single('image'), adminController.postGoods)
// 瀏覽admin後台列表
router.get('/goodshop', adminController.getGoodshop)

router.use('', (req, res) => res.redirect('/admin/goodshop'))

module.exports = router
