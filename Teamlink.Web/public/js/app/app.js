var app = angular.module('teamlink', ['ngRoute', 'teamlink_home', 'teamlink_document', 'teamlink_document_service', 'teamlink_blog', 'teamlink_post', 'postServices','teamlink_tasklist', 'teamlink_task', 'taskServices']);

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
    }).when('/tasks', {
		  templateUrl: 'js/app/tasklist/taskList.html',
		  controller: 'TasklistController'
    }).when('/task/:taskId', {
		  templateUrl: 'js/app/task/task.html',
		  controller: 'TaskController'
    })
	.otherwise({
		  redirectTo: '/home'
    });
});



