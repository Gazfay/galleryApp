var models = require('./../models');
var optimize = require('./../libs/tinify');
var config = require('./../config/config');
var upload = require('./../libs/multer');

exports.getAuthor = function (req, res, next) {
  models.aboutAuthorModel.findOne(function (err, doc) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      res.json(doc);
    }
  });
}

exports.setOrUpdate = function (req, res, next) {
  if (req.body._id) {
    models.aboutAuthorModel.findOne(function (err, data) {
      if (err) {
        throw err;
      } else {
        models.aboutAuthorModel.updateData(data, req, res, ["textAbout", "file"]);
        res.send(200);
      }
    });
  } else {
    upload(req, res, function (err) {
      if (err) {
        throw err;
        res.send(err);
      } else {
        models.aboutAuthorModel.find(function (err, doc) {
          if (err) {
            throw err;
            res.send(err);
          } else {
            if (!doc.length) {
              models.aboutAuthorModel.createData(req, res, { 
                textAbout: req.body.textAbout,
                file: req.files.pictureFile[0]
              });
              optimize(req.files.pictureFile[0].filename);
              res.send(200);
            } else if (doc.length == 1) {
              models.aboutAuthorModel.findOne(function (err, data) {
                if (err) {
                  throw err;
                  res.send(err);
                } 
                models.aboutAuthorModel.deleteFile(config.uploadsPath, data.file.filename, res);
                models.aboutAuthorModel.updateData(data, req, res, ["textAbout"], true);
                optimize(req.files.pictureFile[0].filename);
                res.send(200);
              });
            }
          }
        });
      }
    });
  }
};