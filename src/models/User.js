const mongoose = require('../../config/db')
const BlogPost = require('./BlogPost')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: String,
    name: String,
    password: String,
    creationDate: {
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User