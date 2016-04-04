var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    getDate = require('../libs/getDate');

var schema = new Schema({
  updated_at: String,
  created_at: String,
  textName: String,
  textDescription: String,
  file: Schema.Types.Mixed
}, {collection : 'allWorksCollection'});

schema.pre('save', function(next) {
  var currentDate = getDate();
  this.updated_at = currentDate;
  if (!this.created_at){
    this.created_at = currentDate;
  }
  next();
});

var allWorksModel = mongoose.model('allWorksModel', schema);
module.exports = allWorksModel;