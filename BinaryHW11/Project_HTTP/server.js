var http = require('http');
var url = require('url');
var router = require("./router");
var jsonBP = require('body/json');


http.createServer(function (req, res) {
    switch (req.method) {
        case 'GET':
            if (req.url == '/users') {
                var result = router.findAll();
                res.write(result);
                res.end();
            }
            else if (req.url.indexOf('/users/') == 0 && (req.url.indexOf('/messages') == -1)) {
                var id = req.url.split("/")[2];
                console.log(id);
                result = router.findById(id);
                res.statusCode = result.statusCode;
                res.write(result.message);
                res.end();
            }
            else if (req.url.indexOf('/users/') == 0 && req.url.slice(-9) == '/messages') {
                var id = req.url.split("/")[2];
                result = router.findByIdMessages(id);
                res.statusCode = result.statusCode;
                res.write(result.message);
                res.end();
            }
            else if (req.url.indexOf('/users/') == 0 &&  (req.url.indexOf('/messages/') > -1)) {
                var id = req.url.split("/")[2];
                var title = req.url.split("/")[4];
                console.log(title);
                result = router.findByIdMessagesTitle(id, title);
                res.statusCode = result.statusCode;
                res.write(result.message);
                res.end();
            }
            break;
        case 'POST':
            jsonBP(req, function (err, body) {
                if (req.url == '/users') {
                    result = router.add(body);
                    res.statusCode = result.statusCode;
                    res.write(result.message);
                    res.end();
                }
                else if (req.url.indexOf('/users/') == 0 && req.url.slice(-9) == '/messages') {
                    id = req.url.split("/")[2];
                    console.log(id);
                    result = router.addMessage(id, body);
                    res.statusCode = result.statusCode;
                    res.write(result.message);
                    res.end();
                }
            });
            break;
        case 'PUT':
            jsonBP(req, function (err, body) {
                if (req.url.indexOf('/users/') == 0) {
                    id = req.url.split("/")[2];
                    result = router.update(id, body);
                    res.statusCode = result.statusCode;
                    res.write(result.message);
                    res.end();
                }
            });
            break;
        case 'DELETE':
            if (req.url.indexOf('/users/') == 0) {
                id = req.url.split("/")[2];
                result = router.delete(id);
                res.statusCode = result.statusCode;
                res.write(result.message);
                res.end();
            }
            break;
    }

}).listen(3000);
console.log('Server running at http://localhost:3000/');