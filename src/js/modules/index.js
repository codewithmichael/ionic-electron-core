import angular from 'angular'

import account from './account'
import chats from './chats'
import dash from './dash'

export default angular.module('modules', [
  'ionic',
  account.name,
  chats.name,
  dash.name
]);
