"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const PORT = 7540;
const server = http.createServer();
const posts = [
    {
        title: 'Lorem ipsum',
        content: 'Dolor sit amet'
    }
];
const hello = [
    {
        title: 'Lorem ipsum',
        content: 'Dolor sit amet'
    }
];
server.on('request', (request, response) => {
    switch (request.url) {
        case '/posts': {
            if (request.method === 'GET') {
                response.end(JSON.stringify(posts));
            }
            break;
        }
        case '/': {
            if (request.method === 'GET') {
                response.end(JSON.stringify(hello));
            }
            break;
        }
        default: {
            response.statusCode = 404;
            response.end();
        }
    }
});
server.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(`Server listening on port ${PORT}`);
    }
});
// server.listen(PORT,() => {
//   console.log(`Example app listening on port ${PORT}`)
// })
