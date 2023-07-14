const getUser = req => {
    // req.user ? req.user : null
    return req.user || null
}
module.exports = {
    getUser
}