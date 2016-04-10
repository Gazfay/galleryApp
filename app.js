var bodyParser = require('body-parser');
var config = require('./config/config');
var favicon = require('serve-favicon');
var del = require('./routes/delete');
var post = require('./routes/post');
var get = require('./routes/get');
var express = require('express');
var http = require('http');
var app = express();

app.use(express.static(__dirname + config.staticPath));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/*', get);
app.post('/*', post);
app.delete('/*', del);

module.exports = app;

