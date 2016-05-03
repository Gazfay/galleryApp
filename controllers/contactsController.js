var models = require('./../models');

exports.setContacts = function (req, res, next) {
  models.contactsModel.find( function (err, doc) {
    if (!doc.length) {
      models.contactsModel.createData(req, res, { 
        email: req.body.email,
        telephone: req.body.telephone,
        skype: req.body.skype,
        facebook: req.body.facebook
      });
      res.send(200);
    } else if (doc.length == 1) {
        models.contactsModel.findOne(function (err, doc) {
          if (err) {
            throw err;
            res.send(err);
          } else {
            models.contactsModel.updateData(doc, req, res, ["email", "telephone", "skype", "facebook"]);
            res.send(200);
          }
        });
     }
  });
};

exports.getContacts = function (req, res, next) {
  models.contactsModel.findOne(function (err, doc) {
    if (err) {
      throw err;
      res.send(err);
    } else {
      res.json(doc);
    }
  });
};