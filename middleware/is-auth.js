//this module is for protecting routes from being manually directed
// this will check in the router first to see if the user is logged in
// and then return to the controller if they are.

module.exports = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect ('/login')
    }
    next();
}