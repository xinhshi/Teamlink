angular.module('teamlink_post', [])

.controller('PostController', ['$routeParams', '$location', '$scope', '$sce', 'PostService', 'PostCategory', function($routeParams, $location, $scope, $sce, PostService, PostCategory) {
 

 PostService.getDetail($routeParams.postId).then(function(data) {
        $scope.post = data;
   });

 PostService.getCommentList().then(function(data) {
        $scope.commentList = data;
   });

    $scope.renderHtml = function(html_code)
{
    return $sce.trustAsHtml(html_code);
};

}]);






