var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    getDate = require('../libs/getDate');

var schema = new Schema({
  updated_at: String,
  created_at: String,
  email: String,
  text: String
}, {collection : 'callbacksCollection'});

schema.pre('save', function(next) {
  this.created_at = getDate();
  next();
});

var feedbackModel = mongoose.model('feedbackModel', schema);
module.exports = feedbackModel;