var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
  title: String,
  description: String,
  created_at: Date,
  updated_at: Date
}, {collection : 'mainAdminCollection'});

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