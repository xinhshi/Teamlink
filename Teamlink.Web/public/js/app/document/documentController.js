var mainApp = angular.module("teamlink_document", []);
         
mainApp.controller('DocumentController', function($scope, DocumentService) {
    DocumentService.getDocList().then(function(response) {
        $scope.value = response.length;
    });
});