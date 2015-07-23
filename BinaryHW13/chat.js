module.exports = function (http) {
    var socketio = require('socket.io')(http);
    var users = {};

    socketio.on('connection', function (socket) {
        socket.emit('user id', socket.id);
        users[socket.id] = {};

        socket.on('join room', function () {roomJoin.apply(this, arguments)});
        socket.on('username change', usernameChange);
        socket.on('message send', messageSend);
        socket.on('disconnect', clean);
    });


    function roomJoin (userId, room) {
        var user;
        if (userId && (user = users[userId]) && room && user.room != room) {
            if (user.room)
                this.leave(user.room);
            this.join(room);
            user.room = room;
            console.log('Client connected');
        }
    }

    function usernameChange (userId, name) {
        var user;
        if (userId && (user = users[userId]) && name)
            user.name = name;
    }

    function messageSend (userId, messageText) {
        var user;
        if (userId && (user = users[userId]) && messageText) {
            var message = {
                ownerId: userId,
                owner: user.name,
                text: messageText,
                time: Date.now()
            };
            socketio.to(user.room).emit('chat message', message);
        }
    }

    function clean() {
        delete users[this.id];
        console.log('Client disconnected');
    }
};