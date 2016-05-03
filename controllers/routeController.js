var path = require('path');

exports.adminRoute = function (req, res, next) {
  res.sendfile(path.resolve('./public/admin/index.html'));
};

exports.mainRoute = function (req, res, next) {
  res.sendfile(path.resolve('./public/index.html'));
};
