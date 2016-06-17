angular.module('teamlink_home', [])

.controller('HomeController', function($scope) {
    $scope.name = 'teamlink';

    $scope.user = {
        name: 'Aiguo',
        email: 'ai.guo.ji@cn.schindler.com'
    };
});