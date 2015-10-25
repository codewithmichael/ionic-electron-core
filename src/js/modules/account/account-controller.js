'use strict';

function AccountController($scope) {
  $scope.settings = {
    enableFriends: true
  };
}

module.exports = ['$scope', AccountController];
