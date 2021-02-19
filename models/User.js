const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Post = require('./Post')

// Para encriptacion de password
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true }, },
    password: { type: String, required: true },
    fullname: String,
    email: { type: String, required: true },
    creationdate: { type: Date, default: Date.now },
    role: { type: String, enum: ['admin', 'subscriber'], default: 'subscriber' },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: null }]

})

// Se encripta la password antes de almacenarla
UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})


UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)