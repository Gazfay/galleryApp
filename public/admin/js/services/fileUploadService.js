app.service("fileUploadService", ["$http", function ($http) {
  this.uploadFileToUrl = function (uploadUrl, data, scope) {
    console.log(data);
    var fd = new FormData();
    for (var key in data) {
      fd.append(key, data[key]);
    }

    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined }
    }).success(function(response){
        $('#successModal').modal("show");
    }).error(function(response){
        $scope.errorMessage = response.status + ' ' + response.statusText;
        $scope.$emit('error', $scope.errorMessage);
    });
  }
}]);