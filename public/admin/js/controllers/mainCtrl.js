angular.module('adminApp').controller("mainCtrl", [ "$scope", "$http", function ($scope, $http) {
  $http({
      method: 'GET',
      url: '/get-main'
    }).then(function successCallback(response) {
      $scope.headerData = response.data;
    }, function errorCallback(response) {
        console.log('error', response);
  });

  $scope.submit = function() {
    $scope.mainData = {};
    $scope.mainData.title = $scope.headerData.title;
    $scope.mainData.description = $scope.headerData.description;

    $http({
      method: 'POST',
      url: '/set-main',
      data: $scope.mainData
    }).then(function successCallback(response) {
        $('#successModal').modal("show");
      }, function errorCallback(response) {
        console.log(response.data);
        $scope.error = response.status + ' ' + response.statusText;
        $('#errorModal').modal("show");
    });
  }
}]);