var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var app = express();

var get = require('./routes/get');
var post = require('./routes/post');
var del = require('./routes/delete');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/*', get);
app.post('/*', post);
app.delete('/*', del);

// app.get('/admin/*', function (req, res, next) {
//   res.sendfile(__dirname + '/public/admin/index.html');
// });

// app.post('/set-main', function (req, res, next) {
//   mainAdminModel.find( function (err, doc) {
//     if (!doc.length) {
//       var mainData = new this.model({ 
//         title: req.body.title,
//         description: req.body.description
//       });

//       mainData.save(function (err, mainData, other) {
//         console.log("Saved");
//       });
//     } else if (doc.length == 1) {
//         mainAdminModel.findOne(function (err, page) {
//           if (err) throw err;
//           page.title = req.body.title,
//           page.description = req.body.description,
//           page.save();
//           console.log('update');
//         });
//     }
//   });
//   res.send('Set Main Ok');
// });

// app.get('/get-main', function (req, res, next) {
//   mainAdminModel.findOne(function (err, page) {
//     if (err) throw err;
//     var data = { 
//       title: page.title,
//       description: page.description
//     }
//     res.json(data);
//   });
// });

// app.post('/upload-picture', function (req, res) {
//   upload(req, res, function (err) {
//     if (err) {
//       res.send(err);
//     } else {
//       var work = new allWorksModel({
//         textName: req.body.textName,
//         textDescription: req.body.textDescription,
//         file: req.files.pictureFile[0]
//       });

//       work.save(function (err, work, other) {
//         if (err) throw err;
//         console.log("Saved");
//       });

//       optimize(req.files.pictureFile[0].filename);
//       res.send("File is uploaded");
//     }
//   });
// });

// app.get("/get-works", function (req, res) {
//   allWorksModel.find( function (err, doc) {
//     res.json(doc);
//   });
// });

// app.get("/get-work/:id", function (req, res) {
//   allWorksModel.findOne({_id: req.params.id}, function (err, doc) {
//     console.log(doc);
//     res.json(doc);
//   });
// });

// app.delete("/delete-work/:id", function (req, res) {
//   allWorksModel.findOneAndRemove({_id: req.params.id}, function (err, doc) {
//     fs.unlink('./public/uploads/'+ doc.file.filename + '', function (err) {
//       if (err) throw err;
//       console.log('successfully deleted');
//     });
//     res.send("work deleted");
//   });
// });

// app.post("/update-picture", function (req, res, next) {
//   if (req.body._id) {
//     allWorksModel.findOne({_id: req.body._id}, function (err, doc) {
//       doc.textName = req.body.textName,
//       doc.textDescription = req.body.textDescription,
//       doc.file = req.body.file
//       doc.save();
//       res.send("File is uploaded");
//     });
//   } else {
//       upload(req, res, function (err) {
//         if (err) {
//           console.log(err.code);
//           res.send(err);
//         } else {
//           console.log("here first");
//           allWorksModel.findOne({_id: req.body._id}, function (err, doc) {
//             fs.unlink('./public/uploads/'+ doc.file.filename, function (err) {
//               if (err) throw err;
//               console.log('successfully deleted');
//             });
//             doc.textName = req.body.textName,
//             doc.textDescription = req.body.textDescription,
//             doc.file = req.files.pictureFile[0]
//             doc.save();
//             res.send("File is uploaded");
//           });
//         }
//       });
//     }
// });

// app.post('/about-author', function (req, res) {
//   if (req.body._id) {
//     aboutAuthorModel.findOne(function (err, data) {
//       if (err) throw err;
//       data.textAbout = req.body.textAbout,
//       data.file = req.body.file
//       data.save();
//       res.send("File is uploaded");
//     });
//   } else {
//     upload(req, res, function (err) {
//       if (err) {
//         res.send(err);
//       } else {
//         aboutAuthorModel.find(function (err, doc) {
//           if (!doc.length) {
//             var authorData = new this.model({ 
//               textAbout: req.body.textAbout,
//               file: req.files.pictureFile[0]
//             });

//             authorData.save(function (err, mainData, other) {
//               console.log("Saved");
//             });

//             optimize(req.files.pictureFile[0].filename);
//             res.send("File is uploaded");
//           } else if (doc.length == 1) {
            
//             aboutAuthorModel.findOne(function (err, data) {
//               if (err) throw err;
//               fs.unlink('./public/uploads/'+ data.file.filename + '', function (err) {
//                 if (err) throw err;
//                 console.log('successfully deleted', data.file.filename);
//               });
              
//               data.textAbout = req.body.textAbout,
//               data.file = req.files.pictureFile[0]
//               data.save();
//               console.log('update');

//               optimize(req.files.pictureFile[0].filename);
//               res.send("File is uploaded");
//             });
//           }
//         });
//       }
//     });
//   }
// });

// app.get("/get-author", function (req, res) {
//   aboutAuthorModel.findOne(function (err, doc) {
//     res.json(doc);
//   })
// });

// app.post('/set-contacts', function (req, res, next) {
//   contactsModel.find( function (err, doc) {
//       if (!doc.length) {
//         var contacts = new this.model({ 
//           email: req.body.email,
//           telephone: req.body.telephone,
//           skype: req.body.skype,
//           facebook: req.body.facebook
//         });

//         contacts.save(function (err, mainData, other) {
//           console.log("Saved");
//         });

//       } else if (doc.length == 1) {
//           contactsModel.findOne(function (err, doc) {
//             if (err) throw err;
//             console.log(doc);
//             doc.email = req.body.email,
//             doc.telephone = req.body.telephone,
//             doc.skype = req.body.skype,
//             doc.facebook = req.body.facebook
//             doc.save();
//             console.log('update');
//           });
//       }
//   });
//   res.send('Contacts Set Ok');
// });

// app.get("/get-contacts", function (req, res) {
//   contactsModel.findOne(function (err, doc) {
//     res.json(doc);
//   })
// });

// app.post('/feedback', function (req, res, next) {
//   var feedback = new feedbackModel({ 
//       email: req.body.email,
//       text: req.body.text
//     });
//   feedback.save();
//   res.send('Callback Ok');
// });

// app.get('/feedback', function (req, res, next) {
//   feedbackModel.find( function (err, doc) {
//     console.log(doc);
//     res.json(doc);
//   });
// });

// app.delete('/feedback/:id', function (req, res, next) {
//   console.log(req.params.id);
//   feedbackModel.findOne({_id: req.params.id}, function (err, feed) {
//     feed.remove(function(err) {
//       if (err) throw err;
//       res.send('Feed successfully deleted!');
//     });
//   });
// });

// app.get('/*', function (req, res, next) {
//   res.sendfile(__dirname + '/public/index.html');
// });

module.exports = app;

