"use strict";

var http = require('http');

var app = require('./app');

app.set('port', 3000);
var server = http.createServer(app);
server.listen(3000, function () {
  console.log('Server is running on port 3000');
});