var models = require('./../models');

exports.setMain = function (req, res, next) {
  models.mainAdminModel.find( function (err, doc) {
  if (err) {
    throw err;
    res.send(err);
  } else {
    if (!doc.length) {
      models.mainAdminModel.createData(req, res, { 
        title: req.body.title,
        description: req.body.description
      });
      res.send(200);
    } else if (doc.length == 1) {
        models.mainAdminModel.findOne(function (err, page) {
          if (err) {
            throw err;
            res.send(err);
          } else {
            models.mainAdminModel.updateData(page, req, res, ["title", "description"]);
            res.send(200);
          } 
        });
      }
    }
  });
};

exports.getMain = function (req, res, next) {
  models.mainAdminModel.findOne(function (err, page) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      if (page) {
        res.json(page);
      }
    }
  });
};

