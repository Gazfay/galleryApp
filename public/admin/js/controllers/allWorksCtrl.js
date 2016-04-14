app.controller("allWorksCtrl", ["$http", "$scope", "$localStorage", "$filter", function ($http, $scope, $localStorage, $filter) {
  $scope.$storage = $localStorage;
  $scope.worksLength = 0;
  $scope.bigCurrentPage = 1;
  $scope.works = [];

  $http({
      method: 'GET', 
      url: '/get-works'
    }).then(function successCallback(response) {
        $scope.worksArray =  $filter('orderBy')(response.data, "-created_at");
        $scope.countPage = 1;

        angular.forEach($scope.worksArray, function (work, i) {
          $scope.worksLength++;
          if (i != 0 && i % 12 == 0 ) {
            $scope.countPage++;
          }
          work.page = $scope.countPage;
          $scope.works.push(work);
        });

        if ($scope.worksArray.length % 12 == 0) {
          $scope.countPage--;
        }

        $scope.maxSize = 5;
        $scope.bigTotalItems = $scope.worksLength;
        $scope.$storage = $localStorage.$default({
            page: 1
        });
        $scope.bigCurrentPage = $scope.$storage.page;

        $scope.pageChanged = function() {
          $scope.$storage.page = $scope.bigCurrentPage;
        };

    }, function errorCallback(response) {
        console.log('error');
  });
}]);