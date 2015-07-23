angular.module('chat', [])
    .service('DataService', ['$rootScope', DataService])
    .controller('ChatController', ['$scope', 'DataService', ChatController]);

function DataService($rootScope) {
    var socket = io();

    function setRoomAndUsername(room, username) {
        if (DataService.room != room) {
            socket.emit('join room', DataService.userId, room);
            DataService.room = room;
        }
        if (DataService.username != username) {
            socket.emit('username change', DataService.userId, username);
            DataService.username = username;
        }
    }

    function sendMessage(message) {
        socket.emit('message send', DataService.userId, message);
    }

    socket.on('user id', function (id) {
        DataService.userId = id;
        setRoomAndUsername('Default room', 'Anonymous');
        $rootScope.$apply(function () {
            $rootScope.$broadcast('init');
        });
    });

    socket.on('chat message', function(data) {
        var message = new Message(data);
        $rootScope.$apply(function () {
            $rootScope.$broadcast('message', message);
        });
    });

    return {
        roomAndUsername: setRoomAndUsername,
        send: sendMessage
    }
}

function ChatController($scope, dataService) {
    $scope.showSettings = true;
    $scope.messages = [];
    $scope.roomAndUsername = function () {
        $scope.room = $scope.room || DataService.room;
        $scope.username = $scope.username || DataService.username;

        if ($scope.room != DataService.room)
            $scope.messages = [];

        dataService.roomAndUsername($scope.room, $scope.username);
        $scope.showSettings = false;
    };
    $scope.closeSettings = function () {
        $scope.room = DataService.room;
        $scope.username = DataService.username;
        $scope.showSettings = false;
    };
    $scope.sendMessage = function() {
        dataService.send($scope.messageText);
        $scope.messageText = '';
    };
    $scope.$on('init', function () {
        $scope.room = DataService.room;
        $scope.username = DataService.username;
    });
    $scope.$on('message', function(ignore, message) {
        $scope.messages.push(message);
    });
}

function Message(data) {
    angular.extend(this, data);
}

Message.prototype.isMine = function () {
    return this.ownerId == DataService.userId;
};