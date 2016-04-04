 angular.module('adminApp').controller("aboutAuthorCtrl", ["$scope", "$http", "fileUploadService", function ($scope, $http, fileUploadService) {
  $scope.data = {};
  $scope.errorFile = {
    size: false,
    type: false
  }
  $scope.chooseFile = "Выберете фотографию";
  var file = angular.element(document.querySelector('#uploadFile'));

  $http({
    method: 'GET',
    url: '/get-author',
  }).then(function successCallback(response) {
      $scope.data = response.data;
    }, function errorCallback(response) {
      console.log("bad");
  });

  file.bind("change", function() {
     $scope.errorFile.size = false;
     $scope.errorFile.type = false;

     var fileData = file[0].files[0];
     $scope.chooseFile = fileData.name;
     if (fileData.type !== 'image/png' && fileData.type !== 'image/jpg' && fileData.type !== 'image/jpeg') {
        $scope.errorFile.type = true;
     }

     if (fileData.size > 5242880) {
        $scope.errorFile.size = true;
     }
  });


  $scope.checkValidate = function (formValid) {
    if (formValid ||  $scope.errorFile.size || $scope.errorFile.type) {
      return true;
    } else {
      return false;
    }
  }

  $scope.submitWork = function (data) {
    if($scope.data.pictureFile) {
      var uploadUrl = '/about-author';
      fileUploadService.uploadFileToUrl(uploadUrl, $scope.data);
    } else {
      $http({
        method: 'POST',
        url: '/about-author',
        data: $scope.data
      }).then(function successCallback(response) {
          console.log("ok");
          $('#myModal').modal("show");
        }, function errorCallback(response) {
          console.log("bad");
      });
    }
    $scope.chooseFile = "Выберете фотографию";
  }
  
}]);