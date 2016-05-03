var mongoose = require('../libs/mongoose');
var fs = require('fs');

var Schema = mongoose.Schema;

var schema = new Schema({
  updated_at: String,
  created_at: String,
  textAbout: String,
  file: Schema.Types.Mixed
}, {collection : 'aboutAuthorCollection'});

schema.pre('save', function(next) {
  var currentDate = Date.now();
  this.updated_at = currentDate;
  if (!this.created_at){
    this.created_at = currentDate;
  }
  next();
});

schema.statics.createData = function (req, res, objectData) {
  var data = new aboutAuthorModel(objectData);

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

schema.statics.deleteFile = function (pathUploads, fileName, res) {
  fs.unlink(pathUploads + fileName, function (err) {
    if (err) {
      throw err;
      res.send(err);
    } 
  });
};

var aboutAuthorModel = mongoose.model('aboutAuthorModel', schema);
module.exports = aboutAuthorModel;