var express = require('express');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

require('./router')(app);

app.listen(3000);
console.log('Server running at http://localhost:3000/');