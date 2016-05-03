var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title: String,
  description: String,
  created_at: Date,
  updated_at: Date
}, {collection : 'mainAdminCollection'});

schema.statics.createData = function (req, res, objectData) {
  var data = new mainAdminModel(objectData);

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

schema.pre('save', function(next) {
  var currentDate = Date.now();
  this.updated_at = currentDate;
  if (!this.created_at){
    this.created_at = currentDate;
  }
  next();
});

var mainAdminModel = mongoose.model('mainAdminModel', schema);
module.exports = mainAdminModel;