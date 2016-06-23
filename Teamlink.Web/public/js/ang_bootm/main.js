'use strict';

// Declare app level module which depends on views, and components
angular.module('mainApp', [
  'ngRoute',
  'ngSanitize',
  'mainApp.blog',
  'mainApp.post',

  'postServices'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/blog'});
}])
.controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
  var tabs = [
    { title: 'Blog', path: 'blog', idx: 0},
  ];

  $scope.tabs = tabs;

  $scope.curr_title = tabs[0].title;

  $scope.go = function ( tab, path ) {
    $scope.curr_title = tab.title;
    $location.path(path);
  };
}]);