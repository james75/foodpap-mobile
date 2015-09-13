'use strict';

/**
 * @ngdoc service
 * @name foodpapMobileApp.camera
 * @description
 * # camera
 * Service in the foodpapMobileApp.
 */
angular.module('foodpapMobileApp')
  .service('camera', function ($q, $cordovaCamera) {

    return {
      getPicture: function(options) {
        var q = $q.defer();

        $cordovaCamera.getPicture(cordova-plugin-file);

        return q.promise;
      }
    };

  });
