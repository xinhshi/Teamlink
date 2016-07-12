angular.module('teamlink_task', [])

.controller('TaskController', ['$routeParams', '$location', '$scope', '$sce', 'TaskService',function($routeParams, $location, $scope, $sce, TaskService) {
 

 TaskService.getDetail($routeParams.taskId).then(function(data) {
        $scope.task = data;
   })
 
  TaskService.getCommentList().then(function(data) {
        $scope.commentList = data;
   })

  TaskService.getParticipant($routeParams.taskId).then(function(data) {
        $scope.participantNumber = data.length;
   });

$scope.renderHtml = function(html_code)
{
    return $sce.trustAsHtml(html_code);
};

}]);





