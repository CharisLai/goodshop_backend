// for MVC
const { ensureAuthenticated, getUser } = require('../helpers/auth-helpers')
const authenticated = (req, res, next) => {
    // if (req.isAuthenticated)
    if (ensureAuthenticated(req)) {
        return next()
    }
    res.redirect('/login')
}

const authenticatedAdmin = (req, res, next) => {
    // if (req.isAuthenticated)
    if (ensureAuthenticated(req)) {
        if (getUser(req).isAdmin) return next()
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
}
// seller
const authenticatedSeller = (req, res, next) => {
    // if (req.isAuthenticated)
    if (ensureAuthenticated(req)) {
        if (getUser(req).isSeller) return next()
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    authenticated,
    authenticatedAdmin,
    authenticatedSeller
}
