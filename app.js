var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


//Database connection
const Mongoose = require('mongoose');
// const url = 'mongodb://admin:admin@localhost:27017/usermanagement';
const connUrl = 'mongodb://admin:RUIM0Dj5pNB7nIMW@cluster0-shard-00-00-dncdy.mongodb.net:27017,cluster0-shard-00-01-dncdy.mongodb.net:27017,cluster0-shard-00-02-dncdy.mongodb.net:27017/usermanagement?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const connect = Mongoose.connect(connUrl,{
    useNewUrlParser:true
}); 

connect.then(() => {
  console.log('Connected correctly to server');
}, (err) => { console.log(err); });


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let assignmentRouter = require('./routes/assignment');
let countriesRouter = require('./routes/countries');
let uoloadRouter = require('./routes/upload');


var app = express();
app.use(cors()); 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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
app.use('/assignments', assignmentRouter);
app.use('/countries', countriesRouter);
app.use('/upload', uoloadRouter);


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
