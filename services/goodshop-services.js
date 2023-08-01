const { Products } = require('../models')
const { Op } = require('sequelize')

const goodshopServices = {
    getGoodshop: (req, cb) => {
        const keyword = req.query.keyword
        const product = []
        console.log('keyword:', keyword)
        if (keyword) {
            product.where = {
                [Op.or]: [
                    { name: { [Op.like]: `%${keyword}%` } },
                    { description: { [Op.like]: `%${keyword}%` } }
                ]
            }
        }
        return Products.findAll({
            raw: true,
            ...product
        }).then(product => {
            // 若沒有符合項目則回傳前端提醒訊息
            if (product.length === 0) {
                return cb(null, { message: 'No related products found.' })
            }
            const data = product.map(g => ({
                ...g,
                description: g.description.substring(0, 50)
            }))
            return cb(null, { product: data })
        })
    },
    getProduct: (req, cb) => {
        // 從product table中取得資料
        return Products.findByPk(req.params.id, {
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
