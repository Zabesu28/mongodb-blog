const { Types } = require('mongoose');
const mongoose = require('../../config/db');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    userId: Types.ObjectId,
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String //
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;
