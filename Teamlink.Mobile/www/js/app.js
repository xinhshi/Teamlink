// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ngRoute', 'ionic', 'starter.controllers', 'starter.services']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider,$routeProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.tasklist', {
      url: '/tasklist',
      views: {
        'menuContent': {
          templateUrl: 'templates/tasklist.html',
          controller: 'TasklistCtrl'
        }
      }
    })

  .state('app.task', {
    url: '/tasklist/:taskId',
    views: {
      'menuContent': {
        templateUrl: 'templates/task.html',
        controller: 'TaskCtrl'
      }
    }
  })

  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    })
    
    .state('app.postlist', {
      url: '/postlist',
      views: {
        'menuContent': {
          templateUrl: 'templates/postlist.html',
          controller: 'PostlistCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/postlist/:postId',
    views: {
      'menuContent': {
        templateUrl: 'templates/post.html',
        controller: 'PostCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});


