'use strict';

var angular = require('angular');

module.exports = angular.module('dash', [])
  .controller('DashController', require('./dash-controller'));
