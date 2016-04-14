app.controller("adminCtrl", [ "$scope", "$http", function ($scope, $http) {
  $scope.$on('error', function (event, data) {
    $scope.error = data;
    $('#errorModal').modal("show");
  });
}]);