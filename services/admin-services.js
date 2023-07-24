const { imgurFileHandler } = require('../helpers/file-helpers')
const { Product } = require('../models')

const adminServices = {
    // 瀏覽後台商品列表
    getGoodshop: (req, cb) => {
        Product.findAll({
            raw: true
        })
            .then(product => cb(null, { product }))
            .catch(err => cb(err))
    },
    // // 新增商品
    // createproduct: (req, cb) => {
    //     return cb
    // },
    postProduct: (req, cb) => {
        const { name, price, quantity, description } = req.body
        if (!name) throw new Error('Product name is required!')
        const { file } = req
        imgurFileHandler(file)
            .then(filePath => Product.create({
                name,
                price,
                quantity,
                description,
                image: filePath || null
            }))
            .then(newProduct => cb(null, { product: newProduct }))
            .catch(err => cb(err))
    },
    // 瀏覽特定商品
    getProduct: (req, cb) => {
        return Product.findByPk(req.params.id, {
            raw: true
        })
            .then(product => {
                if (!product) throw new Error("Product didn't exist!")
                return cb(null, { product })
            })
            .catch(err => cb(err))
    },
    // 編輯特定商品GET
    editProduct: (req, cb) => {
        return Product.findByPk(req.params.id, {
            raw: true
        })
            .then(product => {
                if (!product) throw new Error("Product didn't exist!")
                return cb(null, { product })
            })
            .catch(err => cb(err))
    },
    // 編輯特定商品PUT
    putProduct: (req, cb) => {
        const { name, price, quantity, description } = req.body
        if (!name) throw new Error('Product name is required!')
        const { file } = req
        Promise.all([
            Product.findByPk(req.params.id)
        ])
            .then(([product, filePath]) => {
                if (!product) throw new Error("Product didn't exist!")
                return product.update({
                    name,
                    price,
                    quantity,
                    description,
                    image: filePath || Product.image
                })
            })
            .then(() => {
                req.flash('success_messages', 'Product was successfully to update')
                return cb
            })
            .catch(err => cb(err))
    },
    // 刪除特定商品
    deleteProduct: (req, cb) => {
        Product.findByPk(req.params.id)
            .then(product => {
                if (!product) {
                    const err = new Error("Product didn't exist!")
                    err.status = 404
                    throw err
                }
                return product.destroy()
            })
            .then(deleteProduct => cb(null, { product: deleteProduct }))
            .catch(err => cb(err))
    },
    onShelves: (req, cb) => {
        return Product
    }

}
module.exports = adminServices
