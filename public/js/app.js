var app = angular.module('galleryApp', ['ngRoute', 'ngStorage', 'ui.bootstrap', 'ngSanitize', 'uiGmapgoogle-maps', 'ngDialog', 'ngAnimate']);
app.config(["$routeProvider", "$locationProvider", "$compileProvider",function ($routeProvider, $locationProvider, $compileProvider) {
  $locationProvider.html5Mode(true);
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|skype):/);
  $routeProvider 
    .when('/', {
      templateUrl: './views/main.html',
      controller: 'mainCtrl'
    })

    .when('/about-author', {
      templateUrl: './views/about-author.html',
      controller: 'aboutAuthorCtrl'
    })

    .when('/contacts', {
      templateUrl: './views/contacts.html',
      controller: 'contactsCtrl'
    })

    .when('/reviews', {
      templateUrl: './views/reviews.html',
      controller: 'reviewsCtrl'
    })

    .otherwise({
      redirectTo : '/'
    });
}]);
