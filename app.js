var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//Database connection
const Mongoose = require('mongoose');
// const url = 'mongodb://localhost:27017/usermanagement';
//const url = 'mongodb://admin:*#Admin_123@ds163822.mlab.com:63822/usermanagement';
const connUrl = 'mongodb://admin:RUIM0Dj5pNB7nIMW@cluster0-shard-00-00-dncdy.mongodb.net:27017,cluster0-shard-00-01-dncdy.mongodb.net:27017,cluster0-shard-00-02-dncdy.mongodb.net:27017/usermanagement?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
// const url = new MongoClientURI(
//   "mongodb+srv://admin:admin@cluster0.mongodb.net/");

const connect = Mongoose.connect(url,{
    useNewUrlParser:true
});

connect.then(() => {
  console.log('Connected correctly to server');
}, (err) => { console.log(err); });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
