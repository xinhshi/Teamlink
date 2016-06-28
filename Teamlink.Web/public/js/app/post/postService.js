'use strict';

angular.module('postServices', ['ngResource'])

.factory('PostService', ['$http', function($http){
    var service = {};
    var host= 'http://localhost:3000/';
    

    service.getTitle = function() {
        return $http.get(host + 'api/post/list').then(function(response) {
            return response.data;
        });
    }

    return service;
}])

.factory('PostCategory', ['$http', function($http){
    var service = {};
    var host= 'http://localhost:3000/';
    

    service.getCategory = function() {
        return $http.get(host + 'api/post-category/:key').then(function(response) {
            return response.data;
        });
    }

    return service;
}])

.factory('PostByCategory', ['$http', function($http){
    var service = {};
    var host= 'http://localhost:3000/';
    

    service.getPostCategory = function() {
        return $http.get(host + 'api/post-by-category/:key').then(function(response) {
            return response.data;
        });
    }

    return service;
}]);


