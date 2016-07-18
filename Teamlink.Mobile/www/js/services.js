'use strict';

angular.module('starter.services', ['ngResource'])

.factory('PostService', ['$http', function($http){
    var service = {};
    var host= 'http://10.69.18.84:3000/';
    
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

}]);

