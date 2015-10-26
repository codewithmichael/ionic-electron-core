import angular from 'angular';

import ChatsController from './chats-controller';
import ChatDetailController from './chat-detail-controller';
import ChatsFactory from './chats-factory';

export default angular.module('chats', [])
  .controller('ChatsController', ChatsController)
  .controller('ChatDetailController', ChatDetailController)
  .factory('Chats', ChatsFactory);
