var mainAdminController = require('./mainAdminController');
var contactsController = require('./contactsController');
var feedbackController = require('./feedbackController');
var aboutAuthorController = require('./aboutAuthorController');
var loginController = require('./loginController');
var routeController = require('./routeController');
var allWorksController = require('./allWorksController');

var controllers = {
  mainAdminController: mainAdminController,
  contactsController: contactsController, 
  feedbackController: feedbackController,
  aboutAuthorController: aboutAuthorController,
  loginController: loginController,
  routeController: routeController,
  allWorksController: allWorksController
}

module.exports = controllers;