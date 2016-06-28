angular.module('teamlink_blog', [])

.controller('BlogController', ['$routeParams', '$location', '$scope', 'PostService', function($routeParams, $location, $scope, PostService) {
 

 PostService.getTitle({slug: $routeParams.slug}).then(function(data) {
        $scope.blogList = data;
        $scope.value = data.length;


   });
}]);



