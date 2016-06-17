var app = angular.module('teamlink', ['ngRoute', 'teamlink_home', 'teamlink_blog', 'teamlink_document']);

app.config(
  function($routeProvider) {
    $routeProvider.when('/home', {
		  templateUrl: 'js/app/home/home.html',
		  controller: 'HomeController'
    }).when('/blog', {
		  templateUrl: 'js/app/blog/blogList.html',
		  controller: 'BlogController'
    }).when('/blog/add', {
		  templateUrl: 'js/app/blog/blogAdd.html',
		  controller: 'BlogController'
    }).when('/document', {
		  templateUrl: 'js/app/document/documentList.html',
		  controller: 'DocumentController'
    }).otherwise({
		  redirectTo: '/home'
    });
});
