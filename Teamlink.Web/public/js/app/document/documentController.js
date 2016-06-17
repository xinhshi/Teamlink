angular.module('teamlink_document', [])

.controller('DocumentController', function($scope) {
    $scope.todos = [
        {text:'learn angular', done:true},
        {text:'build an angular app', done:false}];
});