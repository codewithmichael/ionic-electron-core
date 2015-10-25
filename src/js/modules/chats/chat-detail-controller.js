'use strict';

function ChatDetailController($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}

module.exports = ['$scope', '$stateParams', 'Chats',
                  ChatDetailController];
