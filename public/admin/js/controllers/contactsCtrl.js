app.controller("contactsCtrl", ["$http", "$scope", function ($http, $scope) {
  $scope.contacts = {};

  $http({
    method: 'GET', 
    url: '/get-contacts'
  }).then(function successCallback(response) {
    $scope.contacts = response.data;
    console.log($scope.contacts);
  }, function errorCallback(response) {
      console.log('error', response);
  });

  $scope.sendContacts = function (contacts) {
    $http({
      method: 'POST',
      url: '/set-contacts',
      data: contacts
    }).then(function successCallback(response) {
        $('#successModal').modal("show");
      }, function errorCallback(response) {
        $scope.errorMessage = response.status + ' ' + response.statusText;
        $scope.$emit('error', $scope.errorMessage);
    });
  }
}]);