var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  updated_at: String,
  created_at: String,
  email: String,
  text: String
}, {collection : 'feedBackCollection'});

schema.pre('save', function(next) {
  this.created_at = Date.now();
  next();
});

schema.statics.createData = function (req, res, objectData) {
  var data = new feedbackModel(objectData);

  data.save(function (err, data, other) {
    console.log('saved');
    if (err) {
      throw err;
      res.send(err);
    } 
  });
}

var feedbackModel = mongoose.model('feedbackModel', schema);
module.exports = feedbackModel;