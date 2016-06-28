angular.module('teamlink_post', [])

.controller('PostController', ['$routeParams', '$location', '$scope', 'PostService', function($routeParams, $location, $scope, PostService) {
 

 PostService.getTitle({slug: $routeParams.slug}).then(function(data) {
        $scope.title = data;
   });
}]);






