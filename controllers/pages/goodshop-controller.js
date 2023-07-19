const { Goods } = require('../../models')

const goodshopController = {
    getGoodshop: (req, res) => {
        return Goods.findAll({
            raw: true
        }).then(goods => {
            const data = goods.map(g => ({
                ...g
            }))
            res.render('goodshop', { goods: data })
        })
    },
    getProduct: (req, res, next) => {
        // 從goods table中取得資料
        return Goods.findByPk(req.params.id, {
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
