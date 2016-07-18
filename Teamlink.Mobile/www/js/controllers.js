angular.module('starter.controllers', [])

.controller('MediaCtrl', function($scope, $ionicModal) {

    $scope.allImages = [{
        'src' : 'img/1336462589861.jpg'
    }, {
        'src' : 'img/1336462607767.jpg'
    }, {
        'src' : 'img/1336465842205.jpg'
    },{
        'src' : 'img/1336466039264.jpg'
    },{
        'src' : 'img/1336549835576.jpg'
    }];

    $scope.showImages = function(index) {
        $scope.activeSlide = index;
        $scope.showModal('templates/image-popover.html');
    }

    $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }

    // Close the modal
    $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.modal.remove()
    };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

//post
.controller('PostlistCtrl', ['$routeParams', '$location', '$scope', '$sce', 'PostService',  function($routeParams, $location, $scope, $sce, PostService) {
 
PostService.getList({slug: $routeParams.slug}).then(function(data) {
    $scope.postlist = data;
    $scope.value = data.length;
})
}])

.controller('PostCtrl', ['$routeParams','$stateParams', '$location', '$scope', '$sce', 'PostService', function($routeParams, $stateParams, $location, $scope, $sce, PostService) {

$scope.renderHtml = function(html_code)
{
    return $sce.trustAsHtml(html_code);
};

PostService.getDetail($stateParams.postId).then(function(data) {
    $scope.post = data;
});
PostService.getCommentList().then(function(data) {
    $scope.commentList = data;
});

}])


//task
.controller('TasklistCtrl', ['$routeParams', '$location', '$scope','$sce' , 'TaskService', function($routeParams, $location, $scope, $sce, TaskService) {
 

 TaskService.getList().then(function(data) {
        $scope.tasklist = data;
        $scope.value = data.length;

   });

$scope.renderHtml = function(html_code)
{
    return $sce.trustAsHtml(html_code);
};
}])


.controller('TaskCtrl', ['$routeParams', '$stateParams', '$location', '$scope', '$sce', 'TaskService',function($routeParams, $stateParams, $location, $scope, $sce, TaskService) {
 
 TaskService.getDetail($stateParams.taskId).then(function(data) {
        $scope.task = data;
   })
 
  TaskService.getCommentList().then(function(data) {
        $scope.commentList = data;
   })

  TaskService.getParticipant($stateParams.taskId).then(function(data) {
        $scope.participantNumber = data.length;
   });

$scope.renderHtml = function(html_code)
{
    return $sce.trustAsHtml(html_code);
};

}]);