function init(port)
{
    const http = require('http');
    const timing = require('./timing');

    var index = 0;

    http.Server((request, result) => {

        console.log(`***    Server: Started ${index}`);
        result.writeHead(200);

        timing.sleep(2000);
        
        result.end('Hello, World\n');
        console.log(`***    Server: Finished ${index}`);
        
        ++index;

    }).listen(port);
}

module.exports = {
    init: init
};