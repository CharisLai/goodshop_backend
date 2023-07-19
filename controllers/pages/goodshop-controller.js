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
    }
}
module.exports = goodshopController
