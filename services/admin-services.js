const { imgurFileHandler } = require('../helpers/file-helpers')
const { Goods } = require('../models')

const adminServices = {
    // 瀏覽後台商品列表
    getGoodshop: (req, cb) => {
        Goods.findAll({
            raw: true
        })
            .then(goods => cb(null, { goods }))
            .catch(err => cb(err))
    },
    // // 新增商品
    // createGoods: (req, cb) => {
    //     return cb
    // },
    postGoods: (req, cb) => {
        const { name, price, quantity, description } = req.body
        if (!name) throw new Error('Product name is required!')
        const { file } = req
        imgurFileHandler(file)
            .then(filePath => Goods.create({
                name,
                price,
                quantity,
                description,
                image: filePath || null
            }))
            .then(newGoods => cb(null, { goods: newGoods }))
            .catch(err => cb(err))
    },
    // 瀏覽特定商品
    getGoods: (req, cb) => {
        return Goods.findByPk(req.params.id, {
            raw: true
        })
            .then(goods => {
                if (!goods) throw new Error("Product didn't exist!")
                return cb(null, { goods })
            })
            .catch(err => cb(err))
    },
    // 編輯特定商品GET
    editGoods: (req, cb) => {
        return Goods.findByPk(req.params.id, {
            raw: true
        })
            .then(goods => {
                if (!goods) throw new Error("Product didn't exist!")
                return cb(null, { goods })
            })
            .catch(err => cb(err))
    },
    // 編輯特定商品PUT
    putGoods: (req, cb) => {
        const { name, price, quantity, description } = req.body
        if (!name) throw new Error('Product name is required!')
        const { file } = req
        Promise.all([
            Goods.findByPk(req.params.id)
        ])
            .then(([goods, filePath]) => {
                if (!goods) throw new Error("Product didn't exist!")
                return goods.update({
                    name,
                    price,
                    quantity,
                    description,
                    image: filePath || Goods.image
                })
            })
            .then(() => {
                req.flash('success_messages', 'Product was successfully to update')
                return cb
            })
            .catch(err => cb(err))
    },
    // 刪除特定商品
    deleteGoods: (req, cb) => {
        Goods.findByPk(req.params.id)
            .then(goods => {
                if (!goods) {
                    const err = new Error("Product didn't exist!")
                    err.status = 404
                    throw err
                }
                return goods.destroy()
            })
            .then(deleteGoods => cb(null, { goods: deleteGoods }))
            .catch(err => cb(err))
    },
    onShelves: (req, cb) => {
        return Goods
    }

}
module.exports = adminServices
