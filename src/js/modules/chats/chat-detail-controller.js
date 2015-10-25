export default function ChatDetailController($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
};
