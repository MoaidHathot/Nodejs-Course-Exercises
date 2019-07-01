const server = require('./server');
const client = require('./client');

const port = 8001;

server.init(port);
// client.send(10, `http://localhost:${port}/`);
