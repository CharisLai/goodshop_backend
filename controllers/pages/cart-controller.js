const { Cart, CartItem, Products } = require('../../models')

const cartController = {
    getCart: async (req, res, next) => {
        try {
            if (req.session.cartId) {
                const cart = await Cart.findOne({
                    where: { id: req.session.cartId },
                    include: [
                        {
                            model: Products,
                            as: 'cartProducts'
                        }
                    ]
                })
                if (!cart) {
                    return res.render('cart', { cart: { cartProducts: [] }, totalPrice: 0 })
                }
                const totalPrice = cart.cartProducts.length > 0 ? cart.cartProducts.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0
                return res.render('cart', { cart: cart.toJSON(), totalPrice })
            } else {
                // 沒有購物，顯示空的購物車內容
                return res.render('cart', { cart: { cartProducts: [] }, totalPrice: 0 })
            }
        } catch (e) {
            console.log(e)
            return next(e)
        }
    },
    // 將項目加入購物車
    addCart: async (req, res) => {
        try {
            if (!req.user || !req.user.id) {
                return res.status(403).json({ error: 'User not authenticated' })
            }
            const userId = req.user.id
            const [cart] = await Cart.findOrCreate({
                where: { id: req.session.cartId || 0 },
                defaults: { user_id: userId }
            })
            const [product, created] = await CartItem.findOrCreate({
                where: {
                    CartId: cart.id,
                    ProductId: req.body.productId
                },
                defaults: {
                    quantity: 1
                }
            })
            if (!created) {
                product.quantity += 1
            }
            // save cartId in session
            req.session.cartId = cart.id
            await product.save()
            return res.status(200).redirect('back')
        } catch (error) {
            console.log('error:', error)
            return res.status(500).json({ error: 'Error processing cart data' })
        }
    },
    // 增加數量
    addCartItem: async (req, res, next) => {
        try {
            // find cart
            const product = await CartItem.findByPk(req.params.productId)
            // find product inventory
            const addProduct = await Products.findByPk(product.ProductId)

            await product.update({
                quantity: product.quantity + 1
            })
            return res.status(200).redirect('back')
        } catch (e) {
            console.log(e)
            return next(e)
        }
    },
    // 減少商品數量
    subCartItem: async (req, res) => {
        try {
            const product = await CartItem.findByPk(req.params.productId)
            await product.update({
                quantity: product.quantity - 1 ? product.quantity - 1 : 1
            })
            return res.redirect('back')
        } catch (error) {
            console.log(error)
        }
    },
    deleteCartItem: async (req, res, next) => {
        try {
            const product = await CartItem.findByPk(req.params.productId)
            if (!product) { throw new Error(`${this}`) }
            await product.destroy()
            return res.status(200).redirect('back')
        } catch (error) {
            console.log(error)
            return next(error)
        }
    }

}
module.exports = cartController
