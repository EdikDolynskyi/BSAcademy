module.exports = function (app) {
    var users = require('./users');

    app.get('/users', users.findAll);
    app.get('/users/:id', users.findById);
    app.get('/users/:id/messages', users.findByIdMessages);
    app.get('/users/:id/messages/:title', users.findByIdMessagesTitle);
    app.post('/users', users.add);
    app.post('/users/:id/messages', users.addMessage);
    app.put('/users/:id', users.update);
    app.delete('/users/:id', users.delete);
};