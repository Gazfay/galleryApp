var mongoHelper = require('./../libs/mongoHelper');
var optimize = require('./../libs/tinify');
var config = require('./../config/config');
var upload = require('./../libs/multer');
var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/set-main', function (req, res, next) {
  mongoHelper.createOrUpdate(req, res);
});

router.post('/upload-picture', function (req, res) {
  mongoHelper.uploadPicture(req, res);
});

router.post("/update-picture", function (req, res, next) {
  if (req.body._id) {
    models.allWorksModel.findOne({_id: req.body._id}, function (err, doc) {
      if (err) {
        throw err;
        res.send(err);
      } else {
        mongoHelper.updateData(doc, req, res, ["textName", "textDescription", "file"]);
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
              mongoHelper.deleteFile(config.uploadsPath, doc.file.filename, res);
              mongoHelper.updateData(doc, req, res, ["textName", "textDescription"], true);
            }
          });
        }
      });
    }
});

router.post('/about-author', function (req, res) {
  if (req.body._id) {
    models.aboutAuthorModel.findOne(function (err, data) {
      if (err) {
        throw err;
      } else {
        mongoHelper.updateData(data, req, res, ["textAbout", "file"]);
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
              mongoHelper.create(models.aboutAuthorModel, req, res, { 
                textAbout: req.body.textAbout,
                file: req.files.pictureFile[0]
              });
              optimize(req.files.pictureFile[0].filename);
            } else if (doc.length == 1) {
              models.aboutAuthorModel.findOne(function (err, data) {
                if (err) {
                  throw err;
                  res.send(err);
                } 
                mongoHelper.deleteFile(config.uploadsPath, data.file.filename, res);
                mongoHelper.updateData(data, req, res, ["textAbout"], true);
                optimize(req.files.pictureFile[0].filename);
              });
            }
          }
        });
      }
    });
  }
});

router.post('/set-contacts', function (req, res, next) {
  models.contactsModel.find( function (err, doc) {
      if (!doc.length) {
        mongoHelper.create(models.contactsModel, req, { 
          email: req.body.email,
          telephone: req.body.telephone,
          skype: req.body.skype,
          facebook: req.body.facebook
        });

      } else if (doc.length == 1) {
          models.contactsModel.findOne(function (err, doc) {
            if (err) {
              throw err;
              res.send(err);
            } else {
              mongoHelper.updateData(doc, req, res, ["email", "telephone", "skype", "facebook"]);
            }
          });
      }
  });
});

router.post('/feedback', function (req, res, next) {
  mongoHelper.create(models.feedbackModel, req, { 
      email: req.body.email,
      text: req.body.text
  });
  res.send('feedback ok');
});

module.exports = router;
