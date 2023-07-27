const { Product } = require('../../models')
const goodshopServices = require('../../services/goodshop-services')

const goodshopController = {
    getGoodshop: (req, res, next) => {
        goodshopServices.getGoodshop(req, (err, data) => err ? next(err) : res.render('goodshop', data))
    },
    getProduct: (req, res, next) => {
        // 從product table中取得資料
        return Product.findByPk(req.params.id, {
            // 原生 JavaScript 物件
            raw: true,
            // 嵌套的形式返回
            nest: true
        })
            // 若沒有資料發出警訊 將資料帶入product模板
            .then(product => {
                if (!product) throw new Error("Product didn't exist!")
                res.render('product', { product, inventroy })
            })
            .catch(err => next(err))
    }
}
module.exports = goodshopController
