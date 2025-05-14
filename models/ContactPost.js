const mongoose = require('mongoose');

const ContactPostSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContactPost', ContactPostSchema);
