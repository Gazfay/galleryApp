var controllers = require('./../controllers');
var models = require('./../models');
var express = require('express');
var router = express.Router();

router.post('/upload-picture', controllers.allWorksController.uploadPicture);
router.post("/update-picture", controllers.allWorksController.updatePicture);
router.post('/about-author', controllers.aboutAuthorController.setOrUpdate);
router.post('/set-contacts', controllers.contactsController.setContacts);
router.post('/feedback', controllers.feedbackController.setFeedback);
router.post('/set-main', controllers.mainAdminController.setMain);
router.post("/login", controllers.loginController.checkAdmin);

module.exports = router;
