var users = require('./db');

exports.findAll = function () {
    return JSON.stringify(findAllUser());

};

exports.findById = function (id) {
    var userId = id;
    var rezult = {};

    if (users.length < userId || userId <= 0 || isNaN(userId)) {
        rezult.statusCode = 404;
        rezult.message = 'Error 404: No user found';
        return rezult;
    }
    --userId;
    rezult.statusCode = 200;
    rezult.message = JSON.stringify(findUserById(userId));
    return rezult;

};

exports.findByIdMessages = function (id) {
    var userId = id;
    var rezult = {};

    if (users.length < userId || userId <= 0 || isNaN(userId)) {
        rezult.statusCode = 404;
        rezult.message = 'Error 404: No user found';
        return rezult;
    }
    --userId;
    rezult.statusCode = 200;
    rezult.message = JSON.stringify(findUserByIdMessages(userId));
    return rezult;

};

exports.findByIdMessagesTitle = function (id, title) {
    var userId = id;
    var rezult = {};

    if (users.length < userId || userId <= 0 || isNaN(userId)) {
        rezult.statusCode = 404;
        rezult.message = 'Error 404: No user found';
        return rezult;
    }
    --userId;
    rezult.statusCode = 200;
    rezult.message = JSON.stringify(findUserByIdMessagesTitle(userId, title));
    return rezult;

};

exports.add = function (body) {
    addition = body;
    var rezult = {};

    if (!addition.hasOwnProperty('name') ||
        !addition.hasOwnProperty('username') ||
        !addition.hasOwnProperty('email') ||
        !addition.hasOwnProperty('messages')) {
        rezult.statusCode = 400;
        rezult.message = 'Error 400: Post syntax incorrect.';
        return rezult;
    }
    addUser(addition);
    rezult.statusCode = 200;
    rezult.message = 'User added';

    return rezult;
};

exports.addMessage = function (id, body) {
    var addition = body;
    var userId = id;
    var rezult = {};

    --userId;
    addUserMessage(userId, addition);
    rezult.statusCode = 200;
    rezult.message = 'Message added';

    return rezult;
};

exports.update = function (id, body) {
    var userId = +id;
    var updates = body;
    var rezult = {};

    if (users.length < userId || userId <= 0 || isNaN(userId)) {
        rezult.statusCode = 404;
        rezult.message = 'Error 404: No user found';
        return rezult;
    }

    else if (!updates.hasOwnProperty('name') ||
        !updates.hasOwnProperty('username') ||
        !updates.hasOwnProperty('email')) {
        rezult.statusCode = 400;
        rezult.message = 'Error 400: Post syntax incorrect.';
        return rezult;
    }

    updateUser(userId, updates);
    rezult.statusCode = 200;
    rezult.message = 'User updated';
    return rezult;
};

exports.delete = function (userId) {
    var rezult = {};
    if (users.length < userId || userId <= 0 || isNaN(userId)) {
        rezult.statusCode = 404;
        rezult.message = 'Error 404: No user found';
        return rezult;
    }
    deleteUser(userId);
    rezult.statusCode = 200;
    rezult.message = 'User deleted';
    return rezult;
};


function findAllUser() {
    return users;
}

function findUserById(id) {
    return users[id];
}

function findUserByIdMessages(id) {
    return users[id].messages;
}

function findUserByIdMessagesTitle(id, title) {
    var res;
    users[id].messages.forEach(function(item){
        if (item.title == title){
            res =  item.content;
        }
    });
    return res;
}


function addUser(addition) {
    var newUserId = users.length + 1;

    var newUser = {
        id: newUserId,
        name: addition.name,
        username: addition.username,
        email: addition.email,
        messages: addition.messages
    };
    users.push(newUser);

}

function addUserMessage(id, addition) {
    var newUserMessage = {
        title: addition.title,
        content: addition.content
    };
    users[id].messages.push(newUserMessage);

}

function updateUser(id, updates) {

    var updUser = {
        id: id,
        name: updates.name,
        username: updates.username,
        email: updates.email
    };
    users[--id] = updUser;
}

function deleteUser(id) {
    users.splice(--id, 1);
}

