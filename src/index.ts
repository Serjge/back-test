import { IncomingMessage, ServerResponse } from 'http';

import { Method, Path } from './enum';
import { addUser, getUsers } from './repository';

require('dotenv').config()
const http = require('http')

const PORT = process.env.PORT

const server = http.createServer()

const cors = (request: IncomingMessage, response: ServerResponse) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.setHeader('Access-Control-Allow-Headers', '*');
  if (request.method === 'OPTIONS') {
    response.writeHead(200);
    response.end();
    return true;
  }
  return false
}


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

  if (cors(request, response)) {
    return
  }

  switch (request.url) {
    case Path.Root: {
      if (request.method === Method.Get) {
        response.write(JSON.stringify(hello));
      }
      break;
    }

    case Path.Posts: {
      if (request.method === Method.Get) {
        response.write(JSON.stringify(posts));
      }
      break;
    }

    case Path.Users: {
      if (request.method === Method.Post) {
        addUser('anna')
        response.write(JSON.stringify({ success: true }));
      } else {
        response.write(JSON.stringify(getUsers()));
      }
      break;
    }
    default: {
      response.statusCode = 404;
      response.write('Page Not Fount');
    }
  }

  response.end()
});

server.listen(PORT, (error: string) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server listening on port ${ PORT }`);
  }
});
