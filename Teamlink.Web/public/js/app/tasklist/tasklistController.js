angular.module('teamlink_task', [])

.controller('TasklistController', ['$routeParams', '$location', '$scope', 'TaskService', function($routeParams, $location, $scope, TaskService) {
 

 TaskService.getList().then(function(data) {
        $scope.taskList = data;
        $scope.value = data.length;

   });


}]);


