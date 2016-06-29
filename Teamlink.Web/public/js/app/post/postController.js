angular.module('teamlink_post', [])

.controller('PostController', ['$routeParams', '$location', '$scope', 'PostService', 'PostCategory', function($routeParams, $location, $scope, PostService, PostCategory) {
 

 PostService.getDetail($routeParams.postId).then(function(data) {
        $scope.post = data;
   });

 PostService.getCommentList().then(function(data) {
        $scope.commentList = data;
   });

}]);






