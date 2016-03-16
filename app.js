var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development';

var app = express();

//upload<=50mb
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//arttemplate engine
var template = require('art-template');
app.set('views', path.join(__dirname, 'public/views/'));
app.engine('html', template.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//route
var index_routes = require('./package/router/index');
app.use(index_routes);
var company_routes = require('./package/router/company');
app.use('/company', company_routes);
var design_routes = require('./package/router/design');
app.use('/design', design_routes);
var material_routes = require('./package/router/material');
app.use('/material', material_routes);
var tel_routes = require('./package/router/tel');
app.use('/tel', tel_routes);
var module_routes = require('./package/router/module');
app.use('/module', module_routes);
var admin_routes = require('./package/router/admin');
app.use('/admin', admin_routes);
var article_routes = require('./package/router/article');
app.use('/article', article_routes);
var sendfile_routes = require('./package/helper/sendfile');
app.use('/file', sendfile_routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    console.log(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;