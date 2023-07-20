const goodshopServices = require('../../services/goodshop-services')

const goodshopController = {
    getGoodshop: (req, res, next) => {
        goodshopServices.getGoodshop(req, (err, data) => err ? next(err) : res.json(data))
    }
}
module.exports = goodshopController
