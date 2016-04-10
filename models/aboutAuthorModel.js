var mongoose = require('../libs/mongoose');
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

var aboutAuthorModel = mongoose.model('aboutAuthorModel', schema);
module.exports = aboutAuthorModel;