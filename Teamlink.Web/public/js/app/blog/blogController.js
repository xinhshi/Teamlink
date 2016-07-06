angular.module('teamlink_blog', [])

.controller('BlogController', ['$routeParams', '$location', '$scope','$sce', 'PostService','PostCategory', function($routeParams, $location, $scope, $sce, PostService, PostCategory) {
 

 PostService.getList({slug: $routeParams.slug}).then(function(data) {
        $scope.blogList = data;
        $scope.value = data.length;

   })

 PostCategory.getCategoryList({slug: $routeParams.slug}).then(function(data) {
      
        $scope.categoryList = data;
        $scope.catvalue = data.length;

   });

   $scope.renderHtml = function(html_code)
{
    return $sce.trustAsHtml(html_code);
};

}]);



