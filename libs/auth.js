var auth = function(req, res, next) {
  if (req.session.admin && req.session.admin == true){
    next();
  } else {
    console.log('error');
    res.redirect('/');
  }
};

module.exports = auth;