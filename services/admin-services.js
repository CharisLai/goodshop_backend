const { imgurFileHandler } = require('../helpers/file-helpers')
const { Products } = require('../models')

// imgur
const imgur = require('imgur')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
imgur.setClientId(IMGUR_CLIENT_ID)
const uploadImg = path => {
    return new Promise((resolve, reject) => {
        imgur.upload(path, (err, img) => {
            if (err) {
                return reject(err)
            }
            return resolve(img)
        })
    })
}
const adminServices = {
    // 瀏覽後台商品列表
    getGoodshop: (req, cb) => {
        Products.findAll({
            raw: true,
            nest: true
        })
            .then(product =>
                cb(null, { product }))

            .catch(err => cb(err))
    },
    postProduct: async (req, cb) => {
        try {
            const { name, price, inventory, description } = req.body
            if (req.file) {
                imgurFileHandler(IMGUR_CLIENT_ID)
                // 處理圖片上傳到 Imgur
                const img = await uploadImg(req.file.path)
                // 創建新的商品
                const newProduct = await Products.create({ name, description, price, inventory, image: img.data.link || null })
                cb(null, { product: newProduct })
            } else {
                await Products.create({ name, description, price, inventory })
                cb(null, { message: 'Product created successfully' })
            }
        } catch (error) {
            console.log(error)
            return cb(error)
        }
    },
    // 瀏覽特定商品
    getProduct: (req, cb) => {
        return Products.findByPk(req.params.id, {
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
        return Products.findByPk(req.params.id, {
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
        const { name, price, inventory, description } = req.body
        if (!name) throw new Error('Product name is required!')

        Promise.all([
            Products.findByPk(req.params.id)
        ])
            .then(([product, filePath]) => {
                if (!product) throw new Error("Product didn't exist!")
                return product.update({
                    name,
                    price,
                    inventory,
                    description,
                    image: filePath || Products.image
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
        Products.findByPk(req.params.id)
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
        return Products
    }

}
module.exports = adminServices
