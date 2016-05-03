var tinify = require('tinify');
tinify.key = "vjolZMgPtduiF3toTAeXpZuu13pegl9x";

var optimize = function (filename) {
   var source = tinify.fromFile('./public/uploads/' + filename);
   var sourceFinish = source.resize({
      method: "fit",
      width: 1200,
      height: 768
   });
   sourceFinish.toFile('./public/uploads/' + filename);
}

module.exports = optimize;