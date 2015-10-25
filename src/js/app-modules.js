'use strict';

var angular = require('angular');
require('ionic-angular');

module.exports = angular.module('starter.modules', [
  'ionic',
  require('./modules/account').name,
  require('./modules/chats').name,
  require('./modules/dash').name
]);
