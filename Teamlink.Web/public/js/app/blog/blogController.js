angular.module('teamlink_blog', [])


.controller('BlogController', ['PostService', 'PostByCategory', 'PostCategory', '$routeParams', '$scope', '$location', function(PostService, PostByCategory, PostCategory, $routeParams, $scope, $location) {
  var blog = this;

  blog.posts = [];

  if ($routeParams.key != null)
    blog.posts = PostByCategory.query({key:$routeParams.key});
  else
    blog.posts = PostService.query();

  var curr_cat = {key:'list', name:'All'};

  $scope.curr_cat = curr_cat;

  blog.categories = [];

  blog.categories = PostCategory.query(function(){
    blog.categories.unshift(curr_cat);
  });

  $scope.go = function ( path ) {
    $location.path( path );
  };

  $scope.refreshPosts = function(the_key, the_name) {
    if (the_key == 'list')
      blog.posts = PostService.query();
    else
      blog.posts = PostByCategory.query({key:the_key});

    $scope.curr_cat = {key:the_key, name:the_name};
  };

}]);

