var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    getDate = require('../libs/getDate');

var schema = new Schema({
  email: String,
  telephone: String,
  skype: String,
  facebook: String,
  created_at: Date,
  updated_at: Date,
}, {collection : 'contactsCollection'});

schema.pre('save', function(next) {
  var currentDate = getDate();
  this.updated_at = currentDate;
  if (!this.created_at){
    this.created_at = currentDate;
  }
  next();
});

var contactsModel = mongoose.model('contactsModel', schema);
module.exports = contactsModel;