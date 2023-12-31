const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')
const admin = require('../../routes/pages/modules/admin')

const goodshopController = require('../../controllers/pages/goodshop-controller')
const userController = require('../../controllers/pages/user-controller')
const cartController = require('../../controllers/pages/cart-controller')

const { authenticated, authenticatedSeller } = require('../../middleware/auth') // 驗證身份
const { generalErrorHandler } = require('../../middleware/error-handler')

// admin後台
router.use('/admin', authenticated, authenticatedSeller, admin)

// signUp註冊
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

// 顯示購物車內容
router.get('/cart', authenticated, cartController.getCart)
// 新增商品到購物車
router.post('/cart', authenticated, cartController.addCart)
// 購物車內增加商品數
router.post('/cartItem/:productId/add', authenticated, cartController.addCartItem)
// 購物車內減少商品數量
router.post('/cartItem/:productId/sub', authenticated, cartController.subCartItem)
//  刪除購物車內商品項目
router.delete('/cartItem/:productId', authenticated, cartController.deleteCartItem)
// login登入
router.get('/login', userController.logInPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.logIn)
// logout登出
router.get('/logout', userController.logOut)

// 瀏覽單一品項
router.get('/product/:id', authenticated, goodshopController.getProduct)

// goodshop前台 搜尋功能
router.get('/goodshop', goodshopController.getGoodshop)

router.use('/', (req, res) => res.redirect('/goodshop'))

// error_msg
router.use('/', generalErrorHandler)

module.exports = router
