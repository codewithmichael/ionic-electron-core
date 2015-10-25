'use strict';

var angular = require('angular');

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html and as a module prefix in app-modules.js)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [require('./app-modules').name])
  .run(require('./app-run-main'))
  .config(require('./app-config-router'));
