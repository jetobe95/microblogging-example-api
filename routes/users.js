var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/User')
const db = mongoose.connection


router.post('/signin', function (req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) res.status(500).send('!Error comprobando al usuario!')
    if (user != null) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch) res.status(200).send({ message: 'ok', role: user.role, id: user._id })
        else res.status(200).send({ message: 'ko' })
      })
    } else {
      res.status(404).send({ message: 'ko' })
    }
  })
})

router.get('/', function (req, res, next) {
  User.find().sort('-creationdate').exec(function (err, users) {
    if (err) res.status(500).send(err)
    else res.status(200).json(users)
  })

});

router.get('/:id', function (req, res) {
  User.findById(req.params.id, function (err, userInfo) {
    if (err) res.status(500).send(err)
    else res.status(200).json(userInfo)
  })

})

router.post('/', (req, res) => {
  User.create(req.body, function (err, userInfo) {
    if (err) res.status(500).send(err)
    else res.sendStatus(200)
  })
})

router.put('/:id', function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, userInfo) {
    if (err) res.status(500).send(err)
    else res.sendStatus(200)
  })
})


router.delete('/:id', function (req, res) {
  User.findByIdAndDelete(req.params.id, function (err, userInfo) {
    if (err) res.status(500).send(err)
    else res.sendStatus(200)
  })
})
module.exports = router;
