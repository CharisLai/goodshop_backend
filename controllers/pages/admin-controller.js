const adminServices = require('../../services/admin-services')
const { Product } = require('../../models')
const { imgurFileHandler } = require('../../helpers/file-helpers')

const adminController = {
    // 瀏覽後台商品列表
    getGoodshop: (req, res, next) => {
        adminServices.getGoodshop(req, (err, data) => err ? next(err) : res.render('admin/goodshop', data))
    },
    // 新增商品
    createProduct: (req, res) => {
        return res.render('admin/create-product')
    },
    postProduct: (req, res, next) => {
        adminServices.postProduct(req, (err, data) => {
            if (err) return next(err)
            req.flash('success_messages', 'Product was successfully created')
            req.session.createProduct = data
            res.redirect('/admin/goodshop')
        })
    },
    // 瀏覽特定商品
    getProduct: (req, res, next) => {
        return Product.findByPk(req.params.id, {
            raw: true
        })
            .then(product => {
                if (!product) throw new Error("Product didn't exist!")
                res.render('admin/product', { product })
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
                res.render('admin/edit-product', { product })
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
                res.redirect('/admin/product')
            })
            .catch(err => next(err))
    },
    // 刪除特定商品
    deleteProduct: (req, res, next) => {
        adminServices.deleteProduct(req, (err, data) => {
            if (err) return next(err)
            req.session.deleteProduct = data
            return res.redirect('/admin/goodshop')
        })
    },
    onShelves: (req, res, next) => {
        return Product
    }

}
module.exports = adminController
