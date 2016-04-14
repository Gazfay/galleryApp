app.controller("addWorkCtrl", ["$scope", "$http", "fileUploadService", "$uibModal", function ($scope, $http, fileUploadService, $uibModal) {
  $scope.data = {};
  $scope.errorFile = {
    size: false,
    type: false
  }

  $scope.chooseFile = "Выберите файл";
  var file = angular.element(document.querySelector('#uploadFile'));
  var uploadUrl = '/upload-picture';

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
    fileUploadService.uploadFileToUrl(uploadUrl, $scope.data, $scope);
    $scope.data.textName = '';
    $scope.data.textDescription = '';
    $scope.chooseFile = "Выберите файл";
    file.val(null);
  }
  
}]);