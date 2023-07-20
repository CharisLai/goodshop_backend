const express = require('express')
const passport = require('../../config/passport')
const router = express.Router()
const admin = require('./modules/admin')
const goodshopController = require('../../controllers/apis/goodshop-controller')
const userController = require('../../controllers/apis/user-controller')
const { apiErrorHandler } = require('../../middleware/error-handler')

router.use('/admin', admin)
router.post('/login', passport.authenticate('local', { session: false }), userController.login)
// goodshop前台
router.get('/goodshop', goodshopController.getGoodshop)

// apiErrorHandler
router.use('/', apiErrorHandler)
module.exports = router
