var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var mongoose = require('./../libs/mongoose');
var models = require('./../models');
var router = express.Router();

router.delete("/delete-work/:id", function (req, res) {
  models.allWorksModel.findOneAndRemove({_id: req.params.id}, function (err, doc) {
    fs.unlink('./public/uploads/'+ doc.file.filename + '', function (err) {
      if (err) throw err;
      console.log('successfully deleted');
    });
    res.send("work deleted");
  });
});

router.delete('/feedback/:id', function (req, res, next) {
  models.feedbackModel.findOne({_id: req.params.id}, function (err, feed) {
    feed.remove(function(err) {
      if (err) throw err;
      res.send('Feed successfully deleted!');
    });
  });
});

module.exports = router;