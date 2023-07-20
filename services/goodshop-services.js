const { Goods } = require('../models')

const goodshopServices = {
    getGoodshop: (req, cb) => {
        return Goods.findAll({
            raw: true
        }).then(goods => {
            const data = goods.map(g => ({
                ...g,
                description: g.description.substring(0, 50)
            }))
            return cb(null, { goods: data })
        })
    },
    getProduct: (req, cb) => {
        // 從goods table中取得資料
        return Goods.findByPk(req.params.id, {
            raw: true
        })
            // 若沒有資料發出警訊 將資料帶入product模板
            .then(product => {
                if (!product) throw new Error("Product didn't exist!")
                return cb(null, { product })
            })
            .catch(err => cb(err))
    }
}
module.exports = goodshopServices
