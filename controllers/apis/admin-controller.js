const { Product } = require('../../models')
const { imgurFileHandler } = require('../../helpers/file-helpers')
const adminServices = require('../../services/admin-services')

const adminController = {
    // 瀏覽後台商品列表
    getGoodshop: (req, res, next) => {
        adminServices.getGoodshop(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    // 新增商品
    createProduct: (req, res) => {
        console.log('What?')
        return res.render('admin/create-product')
    },
    postProduct: (req, res, next) => {
        adminServices.postProduct(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    },
    // 瀏覽特定商品
    getProduct: (req, res, next) => {
        return Product.findByPk(req.params.id, {
            raw: true
        })
            .then(product => {
                if (!product) throw new Error("Product didn't exist!")
                res.json(null, { product })
            })
            .catch(err => next(err))
    },
    // 編輯特定商品GET
    editProduct: (req, res, next) => {
        return Product.findByPk(req.params.id, {
            raw: true
        })
            .then(product => {
                if (!product) throw new Error("Product didn't exist!")
                res.json(null, { product })
            })
            .catch(err => next(err))
    },
    // 編輯特定商品PUT
    putProduct: (req, res, next) => {
        const { name, price, quantity, description } = req.body
        if (!name) throw new Error('Product name is required!')
        const { file } = req
        Promise.all([
            Product.findByPk(req.params.id),
            imgurFileHandler(file)
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
                res.json()
            })
            .catch(err => next(err))
    },
    // 刪除特定商品
    deleteProduct: (req, res, next) => {
        adminServices.deleteProduct(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    }
}
module.exports = adminController
