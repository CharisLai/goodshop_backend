const { Goods } = require('../../models')
const adminController = {
    getGoodshop: (req, res, next) => {
        Goods.findAll({
            raw: true
        })
            .then(goods => res.render('admin/goodshop', { goods }))
            .catch(err => next(err))
    },
    createGoodshop: (req, res) => {
        return res.render('admin/create-goodshop')
    },
    postGoodshop: (req, res, next) => {
        const { name, price, quantity, description } = req.body

        if (!name) throw new Error('Product name is required!')
        Goods.create({
            name,
            price,
            quantity,
            description
        })
            .then(() => {
                req.flash('success_messages', 'Product was successfully created')
                res.redirect('/admin/goodshop')
            })
            .catch(err => next(err))
    },
    getGoods: (req, res, next) => {
        return Goods.findByPk(req.params.id, {
            raw: true
        })
            .then(goods => {
                if (!goods) throw new Error("Product didn't exist!")
                res.render('admin/goods', { goods })
            })
            .catch(err => next(err))
    }
}
module.exports = adminController
