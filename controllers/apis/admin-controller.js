const { Goods } = require('../../models')
const { imgurFileHandler } = require('../../helpers/file-helpers')
const adminServices = require('../../services/admin-services')

const adminController = {
    // 瀏覽後台商品列表
    getGoodshop: (req, res, next) => {
        adminServices.getGoodshop(req, (err, data) => err ? next(err) : res.json(data))
    },
    // 新增商品
    createGoods: (req, res) => {
        console.log('What?')
        return res.render('admin/create-goods')
    },
    postGoods: (req, res, next) => {
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
            .then(() => {
                req.flash('success_messages', 'Product was successfully created')
                res.json()
            })
            .catch(err => next(err))
    },
    // 瀏覽特定商品
    getGoods: (req, res, next) => {
        return Goods.findByPk(req.params.id, {
            raw: true
        })
            .then(goods => {
                if (!goods) throw new Error("Product didn't exist!")
                res.json(null, { goods })
            })
            .catch(err => next(err))
    },
    // 編輯特定商品GET
    editGoods: (req, res, next) => {
        return Goods.findByPk(req.params.id, {
            raw: true
        })
            .then(goods => {
                if (!goods) throw new Error("Product didn't exist!")
                res.json(null, { goods })
            })
            .catch(err => next(err))
    },
    // 編輯特定商品PUT
    putGoods: (req, res, next) => {
        const { name, price, quantity, description } = req.body
        if (!name) throw new Error('Product name is required!')
        const { file } = req
        Promise.all([
            Goods.findByPk(req.params.id),
            imgurFileHandler(file)
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
                res.json()
            })
            .catch(err => next(err))
    },
    // 刪除特定商品
    deleteGoods: (req, res, next) => {
        return Goods.findByPk(req.params.id)
            .then(goods => {
                if (!goods) throw new Error("Product didn't exist!")
                return goods.destroy()
            })
            .then(() => res.json())
            .catch(err => next(err))
    },
    onShelves: (req, res, next) => {
        return Goods
    }

}
module.exports = adminController
