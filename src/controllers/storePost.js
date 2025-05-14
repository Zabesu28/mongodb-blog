const path = require('path');
const BlogPost = require('../models/BlogPost');

module.exports = (req, res) => {
    const image = req.files?.image;

    if (!image) return res.redirect('/post/new');

    const uploadPath = path.resolve(__dirname, '../../public/assets/img', image.name);

    image.mv(uploadPath, async (error) => {
        if (error) return res.status(500).send("Erreur upload");

        await BlogPost.create({
            ...req.body,
            image: '/assets/img/' + image.name
        });

        res.redirect('/list');
    });
};
