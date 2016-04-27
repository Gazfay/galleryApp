// Local Connection
// var mongoose = require('mongoose');
// var connect = mongoose.connection;
// mongoose.connect('mongodb://localhost/galleryDb');
// connect.on('error', console.error.bind(console, 'error connection DB'));


// Mongolab Connection
var mongoose = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
var mongodbUri = 'mongodb://admin:132435@ds059375.mongolab.com:59375/gallerydb';
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;