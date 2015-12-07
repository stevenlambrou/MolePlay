var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var errors = require("./middlewares/errors")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'deadbeef' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/genuserrouter'));
app.use("/author", require("./controllers/authorrouter"));
// app.use("/sitemanager", require("./controllers/sitemanagerrouter"));
// app.use("/globaladmin", require("./controllers/globaladminrouter"));

// catch 404 and forward to error handler
app.use(errors.passError);
// development error handler
// will print stacktrace
app.use(errors.devErrorHandler(app));
// production error handler
// no stacktraces leaked to user
app.use(errors.errorHandler)

module.exports = app;

// //Basic routing to view pages. Not meant to be the correct/best way
// app.get('*', function(req, res) {
//   var page = req.url.substring(1);
//   if(req.url === '/adminPortal') {
//     res.render(page, { title: page, layout: 'portalLayout'});
//   } else {
//     res.render(page, { title: page });
//   }
// });
