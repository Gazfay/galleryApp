var models = require('./../models');
var upload = require('./../libs/multer');
var optimize = require('./../libs/tinify');
var fs = require('fs');

function mongoHelper() {

  this.create = function (model, req, res, objectData) {
    var data = new model(objectData);

    data.save(function (err, data, other) {
      console.log('saved mongoHelper');
      if (err) {
        throw err;
        res.send(err);
      } 
    });
  };

  this.createOrUpdate = function (req, res) {
    models.mainAdminModel.find( function (err, doc) {
      if (err) {
        throw err;
        res.send(err);
      } else {
        if (!doc.length) {
          this.create(models.mainAdminModel, req, res, { 
            title: req.body.title,
            description: req.body.description
          });

        } else if (doc.length == 1) {
            models.mainAdminModel.findOne(function (err, page) {
              if (err) {
                throw err;
                res.send(err);
              } else {
                this.updateData(page, req, res, ["title", "description"]);
              } 
            }.bind(this));
        }
      }
    }.bind(this));
  };

  this.uploadPicture = function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        throw err;
        res.send(err);
      } else {
        this.create(models.allWorksModel, req, res, {
          textName: req.body.textName,
          textDescription: req.body.textDescription,
          file: req.files.pictureFile[0]
        });

        optimize(req.files.pictureFile[0].filename);
        res.send("File is uploaded");
      }
    }.bind(this));
  };

  this.updateData = function (doc, req, res, arrayData, file) {
    arrayData.forEach(function (data, i) {
      doc[data] = req.body[data];
    });
    if (file) {
      doc.file = req.files.pictureFile[0];
    }
    doc.save(function (err, doc, other) {
      if (err) {
        throw err;
        res.send(err);
      } else {
        res.send(200);
      }
    });
  };

  this.deleteFile = function (pathUploads, fileName, res) {
    fs.unlink(pathUploads + fileName, function (err) {
      if (err) {
        throw err;
        res.send(err);
      } else {
        res.send('deleted');
      }
    });
  };
};

module.exports = new mongoHelper();