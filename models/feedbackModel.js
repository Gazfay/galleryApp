var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  updated_at: String,
  created_at: String,
  email: String,
  text: String
}, {collection : 'callbacksCollection'});

schema.pre('save', function(next) {
  this.created_at = Date.now();
  next();
});

var feedbackModel = mongoose.model('feedbackModel', schema);
module.exports = feedbackModel;