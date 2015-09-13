'use strict';

angular.module('foodpapMobileApp', ['ionic', 'ngOpenFB', 'ngCordova'])

.run(function($ionicPlatform) {
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

.run(function ($ionicPlatform, ngFB) {
    ngFB.init({appId: '1010279492328648'});
})
.config(function ($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https|ftp|mailto|file|tel|data|cdvfile)/);
  })
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
    .state('capture', {
    url: '/capture',
    templateUrl: 'templates/capture.html',
    controller: 'CaptureCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
