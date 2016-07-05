'use strict';

angular.module('taskServices', ['ngResource'])

.factory('TaskService', ['$http', function($http){
    var service = {};
    var host= 'http://localhost:3000/';
    
    service.getList = function() {
        return $http.get(host + 'api/task/list').then(function(response) {
            return response.data;
        });
    }

    service.getDetail = function(taskId) {
        return $http.get(host + 'api/task/' + taskId).then(function(response) {
            return response.data;
        });
    }

    service.getCommentList = function() {
        return $http.get(host + 'api/taskcomment/list' ).then(function(response) {
            return response.data;
        });
    }

    return service;
}])
