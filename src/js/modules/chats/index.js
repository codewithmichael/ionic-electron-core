import angular from 'angular';

export default angular.module('chats', [])
  .controller('ChatsController', require('./chats-controller'))
  .controller('ChatDetailController', require('./chat-detail-controller'))
  .factory('Chats', require('./chats-factory'));
