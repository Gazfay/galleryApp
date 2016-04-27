app.controller("mainCtrl", ['$scope', '$http', '$filter', '$localStorage', function ($scope, $http, $filter,  $localStorage) {
    $scope.worksLength = 0;
    $scope.bigCurrentPage = 1;
    $scope.works = [];

    $http({
      method: 'GET', 
      url: '/get-works'
    }).then(function successCallback(response) {
        console.log(response);
        $scope.worksArray =  $filter('orderBy')(response.data, "-created_at");
        $scope.countPage = 1;
        $scope.columNum = 1;

        angular.forEach($scope.worksArray, function (work, i) {
          $scope.worksLength++;
          if (i != 0 && i % 3 == 0 ) {
            $scope.columNum++;
            if($scope.columNum > 4) {
              $scope.columNum = 1;
            }
          }

          if (i != 0 && i % 12 == 0 ) {
            $scope.countPage++;
          }
          work.page = $scope.countPage;
          work.columNum = $scope.columNum;
          $scope.works.push(work);
        });

        if ($scope.worksArray.length % 12 == 0) {
          $scope.countPage--;
        }

        $scope.maxSize = 5;
        $scope.bigTotalItems = $scope.worksLength;
        $scope.$storage = $localStorage.$default({
            pageMain: 1
        });
        $scope.bigCurrentPage = $scope.$storage.pageMain;

        $scope.pageChanged = function() {
          $scope.$storage.pageMain = $scope.bigCurrentPage;
        };

    }, function errorCallback(response) {
        console.log(response);
  });

  window.onload = function () {
    FB.api(
      "/1032776266805134",
      function (response) {
        if (response && !response.error) {
          console.log(response);
        }
      }
    );
  }

}]);