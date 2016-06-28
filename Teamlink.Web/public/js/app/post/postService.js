'use strict';

angular.module('postServices', ['ngResource'])

.factory('PostService', ['$resource', function($resource){
    return $resource('http://localhost:3000/' + 'api/post/list', {}, {
      'query': {method:'GET', isArray:true}
    });
}])


.factory('PostCategory', ['$resource',
  function($resource){
    return $resource('http://localhost:3000/' + 'api/post-category/:key', {}, {
      'query': {method:'GET', params:{key:'list'}, isArray:true}
    });
  }])

.factory('PostByCategory', ['$resource',
  function($resource){
    return $resource('http://localhost:3000/' + 'api/post-by-category/:key', {}, {
      'query': {method:'GET', isArray:true}
    });
  }])

