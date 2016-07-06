'use strict';

angular.module('postServices', ['ngResource'])

.factory('PostService', ['$http', function($http){
    var service = {};
    var host= 'http://localhost:3000/';
    
    service.getList = function() {
        return $http.get(host + 'api/post/list').then(function(response) {
            return response.data;
        });
    }

    service.getDetail = function(postId) {
        return $http.get(host + 'api/post/' + postId).then(function(response) {
            return response.data;
        });
    }

     service.addPost = function(newPost) {
        return $http.post(host + 'api/post/create').then(function(response) {
            return response.data;
        });
    }

     service.updatePost = function(postId) {
        return $http.get(host + 'api/post/' + postId + '/update').then(function(response) {
            return response.data;
        });
    }

    service.deletePost = function(postId) {
        return $http.get(host + 'api/post/' + postId + '/remove').then(function(response) {
            return response.data;
        });
    }

    service.getCommentList = function() {
        return $http.get(host + 'api/comment/list' ).then(function(response) {
            return response.data;
        });
    }

    return service;
}])


.factory('PostCategory', ['$http', function($http){
    var service = {};
    var host= 'http://localhost:3000/';

    service.getCategoryList = function() {
        return $http.get(host + 'api/post-category/list').then(function(response) {
            return response.data;
        });
    }
 
    service.getPostCategory = function() {
        return $http.get(host + 'api/post-by-category/task').then(function(response) {
            return response.data;
        });
    }
    
    return service;

}]);


