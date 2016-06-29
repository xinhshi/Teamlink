var app = angular.module('teamlink', ['ngRoute', 'teamlink_home', 'teamlink_blog', 'teamlink_document', 'teamlink_document_service', 'teamlink_post', 'postServices']);

app.config(
  function($routeProvider) {
    $routeProvider.when('/home', {
		  templateUrl: 'js/app/home/home.html',
		  controller: 'HomeController'
    }).when('/blog', {
		  templateUrl: 'js/app/blog/blogList.html',
		  controller: 'BlogController'
    }).when('/post/:postId', {
		  templateUrl: 'js/app/post/postList.html',
		  controller: 'PostController'
    }).when('/document', {
		  templateUrl: 'js/app/document/documentList.html',
		  controller: 'DocumentController'
    }).when('/task', {
		  templateUrl: 'js/app/task/taskList.html',
		  controller: 'TaskController'
    })
	.otherwise({
		  redirectTo: '/home'
    });
});



