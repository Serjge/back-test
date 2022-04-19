"use strict";
const http = require('http');
const server = http.createServer((req, res) => {
    console.log(req, res);
});
server.listen(7540);
