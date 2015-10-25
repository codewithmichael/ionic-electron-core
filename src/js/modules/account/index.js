'use strict';

var angular = require('angular');

module.exports = angular.module('account', [])
  .controller('AccountController', require('./account-controller'));
