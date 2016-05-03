// Local Connection
// var mongoose = require('mongoose');
// var connect = mongoose.connection;
// mongoose.connect('mongodb://localhost/galleryDb');
// connect.on('error', console.error.bind(console, 'error connection DB'));


// Mongolab Connection
var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.connect(config.mongoDbUri, config.mongooseOptions);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;