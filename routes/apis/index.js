const express = require('express')
const router = express.Router()

const goodshopController = require('../../controllers/apis/goodshop-controller')

// goodshop前台
router.get('/goodshop', goodshopController.getGoodshop)

router.use('/', (req, res) => res.redirect('/goodshop'))

module.exports = router
