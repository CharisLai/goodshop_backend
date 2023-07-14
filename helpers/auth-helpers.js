const getUser = req => {
    // req.user ? req.user : null
    return req.user || null
}
const ensureAuthenticated = req => {
    return req.isAuthenticated()
}
module.exports = {
    getUser,
    ensureAuthenticated
}
