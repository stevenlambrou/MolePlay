exports = module.exports = {};
// error handlers
function passError(req,res,next){
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
}
// development error handler
// will print stacktrace
function devErrorHandler(app){
  if (app.get('env') === 'development'){
    return function(err, req, res, next){
      res.status(err.status || 500);
      res.render('error', {
      message: err.message,
      error: err
      });
    }
  }
}

// production error handler
// no stacktraces leaked to user
function errorHandler(err, req, res, next){
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
}

module.exports = {passError: passError,
                  devErrorHandler: devErrorHandler,
                  errorHandler: errorHandler};








