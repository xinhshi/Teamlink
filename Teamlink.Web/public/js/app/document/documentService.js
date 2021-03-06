angular.module('teamlink_document_service', ['ngResource'])

.factory('DocumentService', ['$http', function($http) {
    var service = {};
    var host= 'http://10.69.18.84:3000/';
    

    service.getDocList = function() {
        return $http.get(host + 'api/post/list').then(function(response) {
            return response.data;
        });
    }

    return service;
}]);