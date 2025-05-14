module.exports = (req, res, next) => {
    if(!req?.session?.user){
        req.flash('error', 'Vous devez être connecté pour accéder à cette page')
        return res.redirect('/login')
    }
    next()
}