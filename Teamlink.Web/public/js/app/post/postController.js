angular.module('teamlink_post', [])

.controller('PostController', ['$routeParams', '$location', '$scope', '$sce', 'PostService', 'PostCategory', function($routeParams, $location, $scope, $sce, PostService, PostCategory) {
 
PostService.getList({slug: $routeParams.slug}).then(function(data) {
    $scope.postList = data;
    $scope.value = data.length;
})

PostCategory.getCategoryList({slug: $routeParams.slug}).then(function(data) {
    $scope.categoryList = data;
});

//  PostCategory.getPostCategory({slug: $routeParams.slug}).then(function(data) {
//     $scope.postCount = data.length;
// });

$scope.renderHtml = function(html_code)
{
    return $sce.trustAsHtml(html_code);
};


$scope.refreshPosts = function() {
   location.reload(); 
  };

}])

.controller('PostDetailController', ['$routeParams', '$location', '$scope', '$sce', 'PostService', 'PostCategory', function($routeParams, $location, $scope, $sce, PostService, PostCategory) {

$scope.renderHtml = function(html_code)
{
    return $sce.trustAsHtml(html_code);
};


$scope.refreshPosts = function() {
   location.reload(); 
};

PostService.getDetail($routeParams.postId).then(function(data) {
        $scope.post = data;
});

  PostService.getCommentList().then(function(data) {
         $scope.commentList = data;
    });

}])