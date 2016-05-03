var controllers = require('./../controllers');
var auth = require('./../libs/auth');
var models = require('./../models');
var express = require('express');
var router = express.Router();

router.get('/admin/', auth, controllers.routeController.adminRoute);
router.use(express.static('./public'));
router.get('/admin/*', auth, controllers.routeController.adminRoute);
router.get('/get-main', controllers.mainAdminController.getMain);
router.get("/get-works", controllers.allWorksController.getWorks);
router.get("/get-work/:id", controllers.allWorksController.getWork);
router.get("/get-author", controllers.aboutAuthorController.getAuthor);
router.get("/get-contacts", controllers.contactsController.getContacts);
router.get('/feedback', controllers.feedbackController.getFeedback);
router.get('/*', controllers.routeController.mainRoute);

module.exports = router;
