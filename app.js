if(process.env.NODE_ENV !=='production'){
  require('dotenv').config()
}
const bodyParser = require('body-parser')
const cors = require('cors')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/post');

const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('mymerndb connection successfull'))
  .catch(err => console.log(err))
var app = express();

// view engine setup


app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
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
app.use('/posts', postsRouter);

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
  res.json({ message: err.message, err: err });
});

module.exports = app;
