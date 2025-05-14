const path = require('path');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

module.exports = async (req, res) => {
    const image = req.files?.image;
    if (!req?.session?.user) {
        req.flash('error', 'Vous devez être connecté pour pouvoir créer un article')
        return res.redirect('/login')
    }
    const user = await User.findById(req.session.user.id).exec()
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
            console.log("creating post by user ", user.name)
            await BlogPost.create({
                ...req.body,
                userId: user._id,
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