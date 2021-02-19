require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRoutesr = require('./routes/post');

const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('mymerndb connection successfull'))
  .catch(err => console.log(err))
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/example/b', function (req, res, next) {
  console.log('repuesta enviada por la funcion next');
  next()
}, function (req, res, next) {
  res.download('./app.js')
})
app.use('/users', usersRouter);
app.use('/posts', postsRoutesr);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
