"use strict";
var app = angular.module('adminApp', ['ngRoute', 'textAngular', 'ui.bootstrap', 'ngStorage']);
app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider 
    .when('/',{
      templateUrl: './views/main.html',
      controller: 'mainCtrl'
    })

    .when('/add-work', {
      templateUrl:'./views/add-work.html',
      controller: 'addWorkCtrl'
    })

    .when('/all-works', {
      templateUrl:'./views/all-works.html',
      controller: 'allWorksCtrl'
    })

    .when('/all-works/:workId', {
      templateUrl: './views/this-work.html',
      controller: 'thisWorkCtrl'
    })

    .when('/all-works/:workId/update-work', {
      templateUrl: './views/update-work.html',
      controller: 'updateWorkCtrl'
    })

    .when('/about-author', {
      templateUrl: './views/about-author.html',
      controller: 'aboutAuthorCtrl'
    })

    .when('/contacts', {
      templateUrl: './views/contacts.html',
      controller: 'contactsCtrl'
    })

    .when('/feedback', {
      templateUrl: './views/feedback.html',
      controller: 'feedbackCtrl'
    })

    .otherwise({
      redirectTo : '/'
    });

});