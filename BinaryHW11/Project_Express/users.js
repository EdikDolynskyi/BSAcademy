var users = require('./db');

exports.findAll = function (req, res) {
    res.json(findAllUser());
};

exports.findById = function (req, res) {
    var userId = req.params.id;

    if (users.length < userId || userId <= 0 || isNaN(userId)) {
        res.statusCode = 404;
        return res.send('Error 404: No user found');
    }
    --userId;
    res.json(findUserById(userId));

};


exports.findByIdMessages = function (req, res) {
    var userId = req.params.id;

    if (users.length < userId || userId <= 0 || isNaN(userId)) {
        res.statusCode = 404;
        return res.send('Error 404: No user found');
    }
    --userId;
    res.json(findUserByIdMessages(userId));

};

exports.findByIdMessagesTitle = function (req, res) {
    var userId = req.params.id;
    var messageTitle = req.params.title;

    if (users.length < userId || userId <= 0 || isNaN(userId)) {
        res.statusCode = 404;
        return res.send('Error 404: No user found');
    }
    --userId;
    res.json(findUserByIdMessagesTitle(userId, messageTitle));
};

exports.add = function (req, res) {
    var addition = req.body;

    if (!addition.hasOwnProperty('name') || !addition.hasOwnProperty('username') || !addition.hasOwnProperty('email')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }
    addUser(addition);
    res.end('User added');
};

exports.addMessage = function (req, res) {
    var userId = req.params.id;
    var addition = req.body;

    if (!addition.hasOwnProperty('title') || !addition.hasOwnProperty('content')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }

    --userId;
    addUserMessage(userId, addition);
    res.end('User message added');
};

exports.update = function (req, res) {
    var userId = req.params.id;
    var updates = req.body;

    if (users.length < userId || userId <= 0 || isNaN(userId)) {
        res.statusCode = 404;
        return res.send('Error 404: No user found');
    }

    else if (!updates.hasOwnProperty('name') || !updates.hasOwnProperty('username') || !updates.hasOwnProperty('email')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }
    updateUser(userId, updates);
    res.end('User updated');
};

exports.delete = function (req, res) {
    var userId = req.params.id;

    if (users.length < userId || userId <= 0 || isNaN(userId)) {
        res.statusCode = 404;
        return res.send('Error 404: No user found');
    }
    --userId;
    deleteUser(userId);
    res.end('User deleted');
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
    users[id].messages.forEach(function (item) {
        if (item.title == title) {
            res = item.content;
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
    var upUser = {
        id: +id,
        name: updates.name,
        username: updates.username,
        email: updates.email
    };
    users[--id] = upUser;
}

function deleteUser(id) {
    users.splice(id, 1);
}