'use strict';

/**
 * @ngdoc function
 * @name foodpapMobileApp.controller:CaptureCtrl
 * @description
 * # CaptureCtrl
 * Controller of the foodpapMobileApp
 */
angular.module('foodpapMobileApp')
  .controller('CaptureCtrl', function ($scope, $sce, $cordovaCamera) {

    $scope.photo = '';
    $scope.takePhoto = function () {

      var options = {
        quality : 75,
      //  destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function (imageUrl) {

        console.log(imageUrl);

        $scope.photo = imageUrl;

        window.resolveLocalFileSystemURL(imageUrl, function(imageUrl) {
      //    var internalUrl = imageUrl.toInternalURL();
       //   console.log(internalUrl);

       //   $scope.photo = internalUrl;
        }, function() {

        });

     //   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
      }, function (err) {
        console.log(err);
      });
    };




    function onDeviceReady() {
      if ($scope.photo === '') {
        $scope.takePhoto();
      }
    }


    function gotFS(fileSystem) {
      fileSystem.root.getFile($scope.photo, null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
      fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
      readDataUrl(file);
      readAsText(file);
    }

    function readDataUrl(file) {
      var reader = new FileReader();
      reader.onloadend = function(evt) {
        console.log("Read as data URL");
        console.log(evt.target.result);
      };
      reader.readAsDataURL(file);
    }

    function readAsText(file) {
      var reader = new FileReader();
      reader.onloadend = function(evt) {
        console.log("Read as text");
        console.log(evt.target.result);
      };
      reader.readAsText(file);
    }

    function fail(error) {
      console.log(error.code);
    }


      document.addEventListener("deviceready", onDeviceReady, false);


  });
