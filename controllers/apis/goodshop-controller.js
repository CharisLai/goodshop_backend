const { Products } = require('../../models')
const goodshopServices = require('../../services/goodshop-services')

const goodshopController = {
    getGoodshop: (req, res, next) => {
        goodshopServices.getGoodshop(req, (err, data) => err ? next(err) : res.json(data))
    },
    getProduct: (req, res, next) => {
        // 從product table中取得資料
        return Products.findByPk(req.params.id, {
            raw: true
        })
            // 若沒有資料發出警訊 將資料帶入product模板
            .then(product => {
                if (!product) throw new Error("Product didn't exist!")
                res.render('product', { product })
            })
            .catch(err => next(err))
    }
}
module.exports = goodshopController
