const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find().sort({ datePosted: -1 });
    res.render('list', { blogposts });
};
