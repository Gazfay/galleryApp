app.controller("aboutAuthorCtrl", ['$scope', '$http', function ($scope, $http) {
  $http({
    method: 'GET', 
    url: '/get-author'
  }).then(function successCallback(response) {
      $scope.author = response.data;
    }, function errorCallback(response) {
        console.log(response);
  });
}]);