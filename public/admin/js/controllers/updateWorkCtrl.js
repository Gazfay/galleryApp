app.controller("updateWorkCtrl", ["$scope", "$http", "fileUploadService", "$routeParams", function ($scope, $http, fileUploadService, $routeParams) {
  $scope.data = {};
  $scope.id = $routeParams.workId;
  $scope.errorFile = {
    size: false,
    type: false
  }
  $scope.chooseFile = "Выберите файл";
  // var id = $routeParams;
  var file = angular.element(document.querySelector('#uploadFile'));

  $http({
    method: 'GET',
    url: "/get-work/"+ $scope.id + "",
  }).then(function successCallback(response) {
      $scope.data = response.data;
    }, function errorCallback(response) {
      console.log(response.data);
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

  $scope.submitWork = function () {
    if($scope.data.pictureFile) {
      var uploadUrl = '/update-picture';
      fileUploadService.uploadFileToUrl(uploadUrl, $scope.data);
    } else {
      $http({
        method: 'POST',
        url: '/update-picture',
        data: $scope.data
      }).then(function successCallback(response) {
          $('#successModal').modal("show");
        }, function errorCallback(response) {
          $scope.errorMessage = response.status + ' ' + response.statusText;
          $scope.$emit('error', $scope.errorMessage);
      });
    }
    $scope.chooseFile = "Выберите файл";
  }
  
}]);