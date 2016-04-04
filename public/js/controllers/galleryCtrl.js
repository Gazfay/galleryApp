app.controller("galleryCtrl", ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $http({
    method: 'GET', 
    url: '/get-main'
  }).then(function successCallback(response) {
      $scope.headerData = response.data;
    }, function errorCallback(response) {
        console.log('error');
  });

  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };
}]);
