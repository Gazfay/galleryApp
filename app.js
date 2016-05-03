var bodyParser = require('body-parser');
var config = require('./config/config');
var favicon = require('serve-favicon');
var del = require('./routes/delete');
var post = require('./routes/post');
var get = require('./routes/get');
var path = require('path');
var express = require('express');
var http = require('http');
var app = express();
var session = require('express-session');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    cookies: {
      httpOnly: true,
      maxAge: null
    },
    resave: false, 
    saveUninitialized: true 
}));

app.get('/*', get);
app.post('/*', post);
app.delete('/*', del);




module.exports = app;

