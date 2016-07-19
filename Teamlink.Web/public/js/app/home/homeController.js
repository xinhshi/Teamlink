angular.module('teamlink_home', ['ui.bootstrap'])

.controller('HomeController', function($scope) {
    $scope.name = 'teamlink';

    $scope.user = {
        name: 'Aiguo',
        email: 'ai.guo.ji@cn.schindler.com'
    };

    $scope.myInterval = 6000;
    $scope.slides = [
        { image: 'images/1336462589861.jpg' },
        { image: 'images/1336462607767.jpg' },
        { image: 'images/1336465842205.jpg' },
        { image: 'images/1336466039264.jpg' },
        { image: 'images/1336549835576.jpg' },
        { image: 'images/1338538921885.jpg' }
    ];
});