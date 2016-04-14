app.controller("thisWorkCtrl", ["$http", "$scope", "$routeParams", "$location", function ($http, $scope, $routeParams, $location) {
  $scope.id = $routeParams.workId;
  $scope.work = {}

  $http({
    method: 'GET',
    url: "/get-work/"+ $scope.id + "",
  }).then(function successCallback(response) {
      $scope.work = response.data;
      console.log(response);
    }, function errorCallback(response) {
      console.log(response.data);
  });

  $scope.deleteModal = function () {
    $('#askModal').modal("show");
  }

  $scope.deleteWork = function (id) {
    $('#askModal').modal('hide');
      $http({
        method: 'DELETE',
        url: "/delete-work/"+ id +"",
      }).then(function successCallback (response) {
          $location.path('all-works');
        }, function errorCallback (response) {
          console.log("bad", response);
      });
   }
}]);