var app = angular.module('teamlink', ['ngRoute', 'teamlink_home', 'teamlink_blog', 
'teamlink_document', 'teamlink_document_service', 'teamlink_post']);

app.config(
  function($routeProvider) {
    $routeProvider.when('/home', {
		  templateUrl: 'js/app/home/home.html',
		  controller: 'HomeController'
    }).when('/blog', {
		  templateUrl: 'js/app/post/post.html',
		  controller: 'PostController'
    }).when('/document', {
		  templateUrl: 'js/app/document/documentList.html',
		  controller: 'DocumentController'
    }).otherwise({
		  redirectTo: '/home'
    });
});
