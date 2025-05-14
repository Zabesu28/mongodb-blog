const BlogPost = require('../models/BlogPost');
const User = require('../models/User')

module.exports = async (req, res) => {
    const aggregatePosts = await BlogPost.aggregate([
        {$sort: {datePosted: -1}},
        {$lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
        }},
        {$unwind: '$user'},
        {$addFields: {username: "$user.name"}},
        {$project: {user: 0}}
    ])
    res.render('list', { blogposts : aggregatePosts });
};
