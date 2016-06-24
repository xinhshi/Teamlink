angular.module('teamlink_post', [])

.controller('PostController', ['$scope', function($scope) {
    $scope.postList = [{
        title: 'hello world',
        author: 'aiguo'
    },{
        title: 'hello sodec',
        author: 'sally'
    },{
        title: 'hello dtf',
        author: 'unknown'
    }];
}]);