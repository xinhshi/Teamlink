angular.module('teamlink_task', [])

.controller('TaskController', ['$routeParams', '$location', '$scope', 'TaskService', function($routeParams, $location, $scope, TaskService) {
 

 TaskService.getDetail($routeParams.taskId).then(function(data) {
        $scope.post = data;
   })
 
  TaskService.getCommentList().then(function(data) {
        $scope.commentList = data;
   });

}]);





