import { IncomingMessage, ServerResponse } from 'http';
import { Method } from './enum';

require('dotenv').config()

const http = require('http')

const PORT = process.env.PORT

const server = http.createServer()

const posts = [
  {
    title: 'Lorem ipsum',
    content: 'Dolor sit amet',
  },
];

const hello = [
  {
    title: 'Lorem ipsum',
    content: 'Dolor sit amet',
  },
];


server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  switch (request.url) {
    case '/posts': {
      if (request.method === Method.Get) {
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

server.listen(PORT, (error: string) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server listening on port ${ PORT }`);
  }
});
