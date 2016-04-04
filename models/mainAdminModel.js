var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    getDate = require('../libs/getDate');


var schema = new Schema({
  title: String,
  description: String,
  created_at: Date,
  updated_at: Date
}, {collection : 'mainAdminCollection'});

schema.pre('save', function(next) {
  var currentDate = getDate();
  this.updated_at = currentDate;
  if (!this.created_at){
    this.created_at = currentDate;
  }
  next();
});

var mainAdminModel = mongoose.model('mainAdminModel', schema);
module.exports = mainAdminModel;