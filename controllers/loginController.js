var config = require('./../config/config');

exports.checkAdmin = function (req, res, next) {
  if (req.body.login == config.adminLogin && req.body.pass == config.adminPass) {
    req.session.admin = true;
    res.redirect('/admin');
  } else {
    res.send(401);
  }
};