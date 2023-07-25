const express = require('express')
const passport = require('../../config/passport')
const router = express.Router()
const admin = require('./modules/admin')
const goodshopController = require('../../controllers/apis/goodshop-controller')
const userController = require('../../controllers/apis/user-controller')
const cartController = require('../../controllers/apis/cart-controller')
const { authenticated, authenticatedAdmin } = require('../../middleware/api-auth')
const { apiErrorHandler } = require('../../middleware/error-handler')

router.use('/admin', authenticated, authenticatedAdmin, admin)

router.post('/login', passport.authenticate('local', { session: false }), userController.login)
// goodshop前台
router.get('/goodshop', goodshopController.getGoodshop)

// 顯示購物車內容
router.get('/cart', cartController.getCart)
// 新增商品到購物車
router.post('/cart', cartController.addCart)

// 購物車內增加商品數
router.post('/cartItem/:productId/add', cartController.addCartItem)
// 購物車內減少商品數量
router.post('/cartItem/:productId/sub', cartController.subCartItem)
//  刪除購物車內商品項目
router.delete('/cartItem/:productId', cartController.deleteCartItem)

router.use('', (req, res) => res.redirect('/cart'))

// apiErrorHandler
router.use('/', apiErrorHandler)
module.exports = router
