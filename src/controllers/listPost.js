const BlogPost = require('../models/BlogPost');
const User = require('../models/User')

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find().sort({ datePosted: -1 });
    const posts = await Promise.all( blogposts.map(async post => {
        const user = await User.findById(post.userId).exec()
        const newpost = {...post.toObject(), username: user.name} 
        console.log(post)
        console.log(newpost)
        return newpost
    }))
    console.log(posts)
    res.render('list', { blogposts : posts });
};
