app.controller("galleryCtrl", ['$scope', '$http', '$location','ngDialog', '$window', function ($scope, $http, $location, ngDialog, $window) {
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

  $scope.loginModal = function() {
    ngDialog.open({ 
      template: './views/popups/loginModal.html',
      className: 'ngdialog-theme-default',
      controller: 'galleryCtrl' 
    });
  }

  $scope.submitAdmin = function (data) {
     $http({
      method: 'POST', 
      url: '/login',
      data: data
    }).then(function successCallback(response) {
        console.log(response);
        $window.location.href = '/admin';
      }, function errorCallback(response) {
         $scope.errorResponse = true;
    });

    
  }

}]);
