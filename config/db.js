const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_campus', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
