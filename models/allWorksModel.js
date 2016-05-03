var mongoose = require('../libs/mongoose');
var fs = require('fs');
var optimize = require('./../libs/tinify');
var config = require('./../config/config');
var upload = require('./../libs/multer');
var Schema = mongoose.Schema;

var schema = new Schema({
  updated_at: String,
  created_at: String,
  textName: String,
  textDescription: String,
  file: Schema.Types.Mixed
}, {collection : 'allWorksCollection'});

schema.statics.createData = function (req, res, objectData) {
  var data = new allWorksModel(objectData);

  data.save(function (err, data, other) {
    if (err) {
      throw err;
      res.send(err);
    } 
  });
};

schema.statics.updateData = function (doc, req, res, arrayData, file) {
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
    } 
  });
};

schema.statics.uploadPicture = function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      allWorksModel.createData(req, res, {
        textName: req.body.textName,
        textDescription: req.body.textDescription,
        file: req.files.pictureFile[0]
      });

      optimize(req.files.pictureFile[0].filename);
      res.send(200);
    }
  });
};

schema.statics.deleteFile = function (fileName, res) {
  fs.unlink(config.uploadsPath + fileName, function (err) {
    if (err) {
      throw err;
      res.send(err);
    } 
  });
};

schema.pre('save', function(next) {
  var currentDate = Date.now();
  this.updated_at = currentDate;
  if (!this.created_at){
    this.created_at = currentDate;
  }
  next();
});

var allWorksModel = mongoose.model('allWorksModel', schema);
module.exports = allWorksModel;