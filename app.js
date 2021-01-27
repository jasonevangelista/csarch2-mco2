var express = require('express');
var path = require('path');
// var logger = require('morgan');
const bodyParser = require('body-parser');
var index = require('./routes/index');
var app = express();

const { loadPage, calculate } = require('./routes/restoringdivision');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // parse formdata client

// routes
// app.use('/', index);
app.get('/', loadPage);
app.get('/restoringdivision/', loadPage);
app.post('/restoringdivision/calculate', calculate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {status:err.status, message:err.message});
});

module.exports = app;
