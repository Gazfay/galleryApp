app.controller("feedbackCtrl", ["$http", "$scope", "$localStorage", "$filter", function ($http, $scope, $localStorage, $filter) {
  $scope.$storage = $localStorage;
  $scope.feedsLength = 0;
  $scope.bigCurrentPage = 1;
  $scope.feeds = [];
  var arr = [];

  $http({
      method: 'GET', 
      url: '/feedback'
    }).then(function successCallback(response) {
        $scope.feedArray =  $filter('orderBy')(response.data, "-created_at");
        $scope.countPage = 1;

        angular.forEach($scope.feedArray, function (feed, i) {
          $scope.feedsLength++;
          if (i != 0 && i % 12 == 0 ) {
            $scope.countPage++;
          }
          feed.page = $scope.countPage;
          $scope.feeds.push(feed);
        });

        console.log($scope.feeds);

        if ($scope.feedArray.length % 12 == 0) {
          $scope.countPage--;
        }

        $scope.maxSize = 5;
        $scope.bigTotalItems = $scope.feedsLength;
        $scope.$storage = $localStorage.$default({
            pageFeed: 1
        });
        $scope.bigCurrentPage = $scope.$storage.pageFeed;

        $scope.pageChanged = function() {
          $scope.$storage.pageFeed = $scope.bigCurrentPage;
        };

    }, function errorCallback(response) {
        console.log('error');
  });

  $scope.showAlert = function (id, feeds) {
    $scope.deleteId = id;
    $scope.feeds = feeds;
    $('#myModal').modal("show");
  }

  $scope.deleteFeed = function (id, feeds) {
    $http({
      method: 'DELETE', 
      url: "/feedback/"+ id +""
      }).then(function successCallback(response) {
        console.log($scope.feeds);
        angular.forEach($scope.feeds, function (feed, i) {
          if (feed._id == id) {
            console.log(feed);
            $scope.feeds.splice(i, 1);
          }
        });
        $('#myModal').modal("hide");
      }, function errorCallback(response) {
        console.log(response.data);
    });
  }
}]);