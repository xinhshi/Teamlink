angular.module('teamlink_blog', [])

.controller('BlogController', ['$routeParams', '$location', '$scope', 'PostService','PostCategory', function($routeParams, $location, $scope, PostService, PostCategory) {
 

 PostService.getTitle({slug: $routeParams.slug}).then(function(data) {
        $scope.blogList = data;
        $scope.value = data.length;

   })

 PostCategory.getCategory({slug: $routeParams.slug}).then(function(data) {
      

        $scope.categoryList = data;
        $scope.catvalue = data.length;


   });
}]);



