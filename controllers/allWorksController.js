var models = require('./../models');
var optimize = require('./../libs/tinify');
var config = require('./../config/config');
var upload = require('./../libs/multer');

exports.uploadPicture = function (req, res, next) {
  models.allWorksModel.uploadPicture(req, res);
};

exports.updatePicture = function (req, res, next) {
  if (req.body._id) {
    models.allWorksModel.findOne({_id: req.body._id}, function (err, doc) {
      if (err) {
        throw err;
        res.send(err);
      } else {
        models.allWorksModel.updateData(doc, req, res, ["textName", "textDescription", "file"]);
        res.send(200);
      }
    });
  } else {
      upload(req, res, function (err) {
        if (err) {
          throw err;
          res.send(err);
        } else {
          models.allWorksModel.findOne({_id: req.body._id}, function (err, doc) {
            if (err) {
              throw err;
              res.send(err);
            } else {
              models.allWorksModel.deleteFile(doc.file.filename, res);
              models.allWorksModel.updateData(doc, req, res, ["textName", "textDescription"], true);
              res.send(200);
            }
          });
        }
      });
   }
};

exports.getWorks = function (req, res, next) {
  models.allWorksModel.find( function (err, doc) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      res.json(doc);
    }
  });
};

exports.getWork = function (req, res, next) {
  models.allWorksModel.findOne({_id: req.params.id}, function (err, doc) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      res.json(doc);
    }
  });
};

exports.deleteWork = function (req, res, next) {
  models.allWorksModel.findOneAndRemove({_id: req.params.id}, function (err, doc) {
    if (err) {
      throw err;
    } else {
      models.allWorksModel.deleteFile(doc.file.filename, res);
      res.send(200);
    }
  });
};