angular.module('teamlink_document_service', ['ngResource'])

.factory('DocumentService', ['$resource', function() {
    var service = {};
    
    service.multiply = function(a, b) {
       return a * b
    }

    return service;
}]);