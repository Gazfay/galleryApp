var models = require('./../models');
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/admin/*', function (req, res, next) {
  res.sendfile(path.resolve('./public/admin/index.html'));
});

router.get('/get-main', function (req, res, next) {
  models.mainAdminModel.findOne(function (err, page) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      if (page) {
        var data = { 
          title: page.title,
          description: page.description
        }
        res.json(data);
      }
    }
  });
});

router.get("/get-works", function (req, res) {
  models.allWorksModel.find( function (err, doc) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      console.log(doc);
      res.json(doc);
    }
  });
});

router.get("/get-work/:id", function (req, res) {
  models.allWorksModel.findOne({_id: req.params.id}, function (err, doc) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});

router.get("/get-author", function (req, res) {
  models.aboutAuthorModel.findOne(function (err, doc) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      console.log(doc);
      res.json(doc);
    }
  })
});

router.get("/get-contacts", function (req, res) {
  models.contactsModel.findOne(function (err, doc) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      res.json(doc);
    }
  })
});

router.get('/feedback', function (req, res, next) {
  models.feedbackModel.find( function (err, doc) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});

router.get('/*', function (req, res, next) {
  res.sendfile(path.resolve('./public/index.html'));
});

module.exports = router;
