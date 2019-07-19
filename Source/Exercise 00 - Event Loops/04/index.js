const server = require('./server');
const client = require('./client');

const port = 8001;
const clusterCount = 4;

server.init(port, clusterCount);
client.send(10, `http://localhost:${port}/`);
