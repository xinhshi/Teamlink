var mainApp = angular.module("teamlink_document", []);
         
mainApp.controller('DocumentController', function($scope, DocumentService) {
    $scope.value = DocumentService.multiply(2, 3);
})