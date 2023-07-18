const { Goods } = require('../../models')
const adminController = {
    getGoodshop: (req, res, next) => {
        Goods.findAll({
            raw: true
        })
            .then(goods => res.render('admin/goodshop', { goods }))
            .catch(err => next(err))
    }
}
module.exports = adminController
