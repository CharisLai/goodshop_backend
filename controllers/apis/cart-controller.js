const { Cart, CartItem, Products } = require('../../models')

const cartController = {
    getCart: async (req, res) => {
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
                    return res.status(200).json({ cart: { cartProducts: [] }, totalPrice: 0 })
                }
                const totalPrice = cart.cartProducts.length > 0 ? cart.cartProducts.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0
                return res.status(200).json({ cart: cart.toJSON(), totalPrice })
            } else {
                // 沒有購物車，返回空的購物車內容
                return res.status(200).json({ cart: { cartProducts: [] }, totalPrice: 0 })
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    // 將項目加入購物車
    addCart: async (req, res) => {
        try {
            // cart
            const userId = req.user.id
            console.log(userId)
            const [cart] = await Cart.findOrCreate({ where: { id: req.session.cartId || 0 } })
            const [product, created] = await CartItem.findOrCreate({
                where: {
                    CartId: cart.id,
                    user_id: userId,
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
            return res.status(200).json({ message: 'Product added to cart successfully' })
        } catch (error) {
            console.log('error:', error)
            return res.status(500).json({ error: 'Error processing cart data' })
        }
    },
    // 增加數量
    addCartItem: async (req, res) => {
        try {
            // find cart
            const product = await CartItem.findByPk(req.params.productId)
            // find product inventory
            const addProduct = await Products.findByPk(product.ProductId)
            console.log(addProduct)
            await product.update({
                quantity: product.quantity + 1
            })
            return res.status(200).json({ message: 'Quantity increased successfully' })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    // 減少商品數量
    subCartItem: async (req, res) => {
        try {
            const product = await CartItem.findByPk(req.params.productId)
            await product.update({
                quantity: product.quantity - 1 ? product.quantity - 1 : 1
            })
            return res.status(200).json({ message: 'Quantity decreased successfully' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    deleteCartItem: async (req, res, next) => {
        try {
            const product = await CartItem.findByPk(req.params.productId)
            if (!product) { throw new Error('Cart item not found!') }
            await product.destroy()
            return res.status(200).json({ message: 'Cart item deleted successfully' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    }

}
module.exports = cartController
