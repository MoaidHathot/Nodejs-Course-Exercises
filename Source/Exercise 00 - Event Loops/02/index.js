const server = require('./server');
const client = require('./client');

const port = 8001;

const args = process.argv[2];

if(args === 'server')
{
    server.init(port);
}
else
{
    client.send(10, `http://localhost:${port}/`);
}
