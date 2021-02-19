const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

//Modelos

const Post = require('../models/Post')
const User = require('../models/User')
const db = mongoose.connection



router.get('/', function (req, res) {
    Post.find().sort('-publicationdate').populate('user').exec(function (err, posts) {
        if (err) res.status(500).send(err)
        else res.status(200).json(posts)
    })
})
router.get('/all/:id', function (req, res) {
    Post.find({ user: req.params.id }).sort('-publicationdate').populate('user').exec(function (err, posts) {
        if (err) res.status(500).send(err)
        else res.status(200).json(posts)
    })
})


router.post('/', function (req, res) {
    User.findById(req.body.iduser, function (err, userInfo) {
        if (err) res.status(500).send(err)
        else {
            const { iduser, title, description } = req.body
            const postInstance = new Post({
                user: iduser,
                title,
                description
            })
            userInfo.posts.push(postInstance)


            userInfo.save(function (err) {
                if (err) res.status(500).send(err)
                else {
                    postInstance.save(function (err) {
                        if (err) res.status(500).send(err)
                        res.sendStatus(200)

                    })

                }
            })
        }
    })
})


router.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, function (err, postInfo) {
        if (err) res.status(500).send(err)
        else res.status(200)
    })
})


router.delete('/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id, function (err, postInfo) {
        if (err) res.status(500).send(err)
        else {
            User.findByIdAndUpdate(postInfo.user, { $pull: { posts: postInfo._id } }, (err, userInfo) => {
                if (err) res.status(500).send(err)
                else res.sendStatus(200)
            })
        }
    })
})
module.exports = router