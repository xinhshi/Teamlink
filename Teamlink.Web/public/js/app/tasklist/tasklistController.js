angular.module('teamlink_tasklist', [])

.controller('TasklistController', ['$routeParams', '$location', '$scope','$sce' , 'TaskService', function($routeParams, $location, $scope, $sce, TaskService) {
 

 TaskService.getList().then(function(data) {
        $scope.taskList = data;
        $scope.value = data.length;

   });

$scope.renderHtml = function(html_code)
{
    return $sce.trustAsHtml(html_code);
};

}]);


