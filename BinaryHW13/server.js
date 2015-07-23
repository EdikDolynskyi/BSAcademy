var express = require('express')();
var http = express.listen(3000);
require('./chat')(http);

express
    .get('/', function (req, res) {
        res.sendFile(__dirname + '/view/index.html');
    })
    .get('/favicon.ico', function (req, res) {
        res.sendFile(__dirname + '/favicon.ico');
    })
    .get('/css/core.css', function (req, res) {
        res.sendFile(__dirname + '/css/core.css');
    })
    .get('/js/chat.js', function (req, res) {
        res.sendFile(__dirname + '/js/chat.js');
    })
    .get('*', function (req, res) {
        res.statusCode = 403;
        res.end('Access Denied');
    });