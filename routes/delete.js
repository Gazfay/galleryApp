var mongoHelper = require('./../libs/mongoHelper');
var config = require('./../config/config');
var models = require('./../models');
var express = require('express');
var router = express.Router();

router.delete("/delete-work/:id", function (req, res) {
  models.allWorksModel.findOneAndRemove({_id: req.params.id}, function (err, doc) {
    if (err) {
      throw err;
    } else {
      mongoHelper.deleteFile(config.uploadsPath, doc.file.filename, res);
    }
  });
});

router.delete('/feedback/:id', function (req, res, next) {
  models.feedbackModel.findOne({_id: req.params.id}, function (err, feed) {
    feed.remove(function(err) {
      if (err) {
        throw err;
        res.send(err);
      } else {
        res.send('Feed successfully deleted!');
      }
    });
  });
});

module.exports = router;