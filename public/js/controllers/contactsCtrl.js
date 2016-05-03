app.controller("contactsCtrl", ['$scope', '$http', 'ngDialog', function ($scope, $http, ngDialog) {
  $scope.contacts = {};
  $scope.length = false;
  $scope.textMax = 300;
  $scope.symbols = 300;

  $scope.submitCallback = function (data) {
    $http({
      method: 'POST', 
      url: '/feedback',
      data: data
    }).then(function successCallback(response) {
        ngDialog.open({ 
          template: './views/popups/successContacts.html',
          className: 'ngdialog-theme-default',
          controller: 'contactsCtrl' 
        });
        $scope.data.email = $scope.data.text = '';
      }, function errorCallback(response) {
          ngDialog.open({ 
            template: './views/popups/errorContacts.html',
            className: 'ngdialog-theme-default',
            controller: 
              ['$scope', function($scope) {
                $scope.errorResponse = response;
             }] 
          });
    });
  }

  $http({
    method: 'GET', 
    url:'/get-contacts',
  }).then(function successCallback(response) {
      $scope.contacts = response.data;
    }, function errorCallback(response) {
        console.log('error');
  });

  $scope.map = {center: {latitude: 48.483731, longitude: 34.608287 }, zoom: 12 };
  $scope.options = { styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dbdbdb"},{"visibility":"on"}]}]};
}]);