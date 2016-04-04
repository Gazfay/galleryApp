var express = require('express');
var fs = require('fs');
var mongoose = require('./../libs/mongoose');
var models = require('./../models');
var mongoHelper = require('./../libs/mongoHelper');
var upload = require('./../libs/multer');
var optimize = require('./../libs/tinify');
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
            fs.unlink('./public/uploads/'+ doc.file.filename, function (err) {
              if (err) {
                throw err;
                res.send(err);
              } else {
                mongoHelper.updateData(doc, req, res, ["textName", "textDescription"], true);
              }
            });
          });
        }
      });
    }
});

router.post('/about-author', function (req, res) {
  if (req.body._id) {
    models.aboutAuthorModel.findOne(function (err, data) {
      if (err) throw err;
      data.textAbout = req.body.textAbout,
      data.file = req.body.file
      data.save();
      res.send("File is uploaded");
    });
  } else {
    upload(req, res, function (err) {
      if (err) {
        throw err;
        res.send(err);
      } else {
        models.aboutAuthorModel.find(function (err, doc) {
          if (!doc.length) {
            mongoHelper.create(models.aboutAuthorModel, req, { 
              textAbout: req.body.textAbout,
              file: req.files.pictureFile[0]
            });

            optimize(req.files.pictureFile[0].filename);
            res.send("File is uploaded");
          } else if (doc.length == 1) {
            
            models.aboutAuthorModel.findOne(function (err, data) {
              if (err) throw err;
              fs.unlink('./public/uploads/'+ data.file.filename + '', function (err) {
                if (err) throw err;
                console.log('successfully deleted', data.file.filename);
              });
              
              data.textAbout = req.body.textAbout,
              data.file = req.files.pictureFile[0]
              data.save();
              console.log('update');

              optimize(req.files.pictureFile[0].filename);
              res.send("File is uploaded");
            });
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
            if (err) throw err;
            doc.email = req.body.email,
            doc.telephone = req.body.telephone,
            doc.skype = req.body.skype,
            doc.facebook = req.body.facebook
            doc.save();
            console.log('update');
          });
      }
  });
  res.send('Contacts Set Ok');
});

router.post('/feedback', function (req, res, next) {
  mongoHelper.create(models.feedbackModel, req, { 
      email: req.body.email,
      text: req.body.text
  });
  res.send('feedback ok');
});

module.exports = router;
