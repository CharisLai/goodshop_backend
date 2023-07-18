const { Goods } = require('../../models')
const adminController = {

    // 瀏覽後台商品列表
    getGoodshop: (req, res, next) => {
        Goods.findAll({
            raw: true
        })
            .then(goods => res.render('admin/goodshop', { goods }))
            .catch(err => next(err))
    },
    // 新增商品
    createGoods: (req, res) => {
        console.log('What?')
        return res.render('admin/create-goods')
    },
    postGoods: (req, res, next) => {
        const { name, price, quantity, description } = req.body
        console.log('Here')
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
    },
    editGoods: (req, res, next) => {
        return Goods.findByPk(req.params.id, {
            raw: true
        })
            .then(goods => {
                if (!goods) throw new Error("Product didn't exist!")
                res.render('admin/edit-goods', { goods })
            })
            .catch(err => next(err))
    },
    putGoods: (req, res, next) => {
        const { name, price, quantity, description } = req.body
        if (!name) throw new Error('Product name is required!')
        Goods.findByPk(req.params.id)
            .then(goods => {
                if (!goods) throw new Error("Product didn't exist!")
                return goods.update({
                    name,
                    price,
                    quantity,
                    description
                })
            })
            .then(() => {
                req.flash('success_messages', 'Product was successfully to update')
                res.redirect('/admin/goods')
            })
            .catch(err => next(err))
    }
}
module.exports = adminController
