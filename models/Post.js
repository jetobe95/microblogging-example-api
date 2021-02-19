const mongoose = require('mongoose')
const { Schema } = mongoose
const User = require('./User')
const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    publicationdate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post',PostSchema)