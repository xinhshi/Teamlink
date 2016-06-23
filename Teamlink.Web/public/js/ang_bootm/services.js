'use strict';

var postServices = angular.module('postServices', ['ngResource']);

postServices.factory('Post', ['$resource',
  function($resource){
    return $resource(host + 'api/post/:slug', {}, {
      query: {method:'GET', params:{slug:'list'}, isArray:true}
    });
  }]);

postServices.factory('PostCategory', ['$resource',
  function($resource){
    return $resource(host + 'api/post-category/:key', {}, {
      query: {method:'GET', params:{key:'list'}, isArray:true}
    });
  }]);

postServices.factory('PostByCategory', ['$resource',
  function($resource){
    return $resource(host + 'api/post-by-category/:key', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);

