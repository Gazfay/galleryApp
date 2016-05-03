var models = require('./../models');

exports.setFeedback = function (req, res, next) {
  models.feedbackModel.createData(req, res, { 
    email: req.body.email,
    text: req.body.text
  });
  res.send('feedback ok');
};

exports.getFeedback = function (req, res, next) {
  models.feedbackModel.find( function (err, doc) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      res.json(doc);
    }
  });
};

exports.deleteFeedback = function (req, res, next) {
  models.feedbackModel.findOne({_id: req.params.id}, function (err, feed) {
    feed.remove(function(err) {
      if (err) {
        throw err;
        res.send(err);
      } else {
        res.send(200);
      }
    });
  });
};