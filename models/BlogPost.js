const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: String,
  username: String,
  body: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);