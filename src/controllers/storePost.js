const path = require('path');
const BlogPost = require('../models/BlogPost');

module.exports = (req, res) => {
    const image = req.files?.image;

    if (!image) {
        req.flash('error', 'Aucune image sélectionnée.');
        return res.redirect('/post/new');
    }

    const uploadPath = path.resolve(__dirname, '../../public/assets/img', image.name);

    image.mv(uploadPath, async (error) => {
        if (error) {
            console.error('Erreur upload :', error);
            req.flash('error', 'Échec du téléchargement de l’image.');
            return res.redirect('/post/new');
        }

        try {
            await BlogPost.create({
                ...req.body,
                image: '/assets/img/' + image.name
            });

            req.flash('success', 'Article créé avec succès avec image.');
            res.redirect('/list');
        } catch (err) {
            console.error('Erreur MongoDB :', err);
            req.flash('error', 'Erreur lors de l’enregistrement de l’article.');
            res.redirect('/post/new');
        }
    });
};