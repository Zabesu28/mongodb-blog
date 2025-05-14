const validateMiddleware = (req, res, next) => {
    console.log('entering validation middleware')
    if (!req.files || !req.files.image || !req.body.title || !req.body.body) {
        console.log("something is missing")
        req.flash('error','Il manque des éléments pour créer votre article')
        return res.redirect('/post/new');
    }
    next();
};

module.exports = validateMiddleware;
