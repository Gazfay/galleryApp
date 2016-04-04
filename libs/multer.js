var multer = require('multer');
var path = require('path');
var limits = { fileSize: 5242880 };

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var fileFilter = function (req, file, cb) {
      if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
        cb(new Error('Bad file mimetype'));
      } else {
        cb(null, true);
    }
}

var upload = multer({ storage : storage, fileFilter: fileFilter, limits: limits})
                  .fields([{ name: "pictureFile", maxCount: 1 }]);
                  
module.exports = upload;