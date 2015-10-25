import angular from 'angular';

import modules from './modules';
import main from './app-main';
import config from './app-config';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
export default angular.module('starter', [modules.name])
  .run(main)
  .config(config);
