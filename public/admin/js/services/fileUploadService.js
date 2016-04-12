angular.module('adminApp').service("fileUploadService", ["$http", function ($http) {
  this.uploadFileToUrl = function (uploadUrl, data, scope) {
    console.log(data);
    var fd = new FormData();
    for (var key in data) {
      fd.append(key, data[key]);
    }

    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined }
    })
      .success(function(response){
        console.log(response);
        $('#myModal').modal("show");
        scope.open();
      })
      .error(function(response){
        console.log(response,'bad');
      });
    }
    
}]);