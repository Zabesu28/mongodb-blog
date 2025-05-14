const validateMiddleware = (req, res, next) => {
    if (!req.files || !req.files.image || !req.body.title || !req.body.body || !req.body.username) {
        return res.redirect('/post/new');
    }
    next();
};

module.exports = validateMiddleware;
