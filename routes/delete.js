var controllers = require('./../controllers');
var models = require('./../models');
var express = require('express');
var router = express.Router();

router.delete("/delete-work/:id", controllers.allWorksController.deleteWork);
router.delete('/feedback/:id', controllers.feedbackController.deleteFeedback);

module.exports = router;