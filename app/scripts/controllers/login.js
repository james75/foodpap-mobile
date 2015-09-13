'use strict';

/**
 * @ngdoc function
 * @name foodpapMobileApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the foodpapMobileApp
 */
angular.module('foodpapMobileApp')
  .controller('LoginCtrl', function ($scope, $cordovaFacebook) {

    $scope.accessToken = '';
    $scope.loggedIn = false;
    $scope.name = '';

    $scope.fbLogin = function () {
      $cordovaFacebook.login(["public_profile", "email", "user_friends"])
        .then(function(success) {
          console.log('Facebook login succeeded');
          console.log(success);


        }, function (error) {
          console.log('Facebook login failed');
        });

    };
    $scope.getLoginStatus = function () {
       checkLoggedIn(getUserData);
    };

    $scope.getAccessToken = function () {
      $cordovaFacebook.getAccessToken()
        .then(function(success) {
          console.log(success);
        }, function (error) {
          // error
        });
    };

    function checkLoggedIn(onSuccess) {
      $cordovaFacebook.getLoginStatus()
        .then(function (success) {
          console.log(success.status);
          if(success.status === 'connected') {
            $scope.loggedIn = true;
            $scope.accessToken = success.authResponse.accessToken;
            onSuccess();
          }
        }, function (error) {
          // error
        });

    }

    function getUserData() {
      $cordovaFacebook.api("me", ["public_profile"])
        .then(function(success) {
          $scope.name = success.name;
        }, function (error) {
          // error
        });
    }

    function onDeviceReady() {
      checkLoggedIn(getUserData);
    }

    document.addEventListener("deviceready", onDeviceReady, false);


  });
