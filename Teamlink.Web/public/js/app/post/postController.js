angular.module('teamlink_post', [])

.controller('PostController', ['$routeParams', '$location', '$scope', 'PostService', function($routeParams, $location, $scope, PostService) {
  var self = this;

  $scope.go = function ( path ) {
    $location.path( path );
  };

   PostService.get({slug: $routeParams.slug}, function(post) {
     self.post = post
   });
}]);