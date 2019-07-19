function init(port, clusterCount)
{
    const cluster = require('cluster');
    
    if(cluster.isMaster)
    {
        console.log("*** Master");
        for(var index = 0; index < clusterCount; ++index)
        {
            cluster.fork();
        }
    }
    else
    {
        console.log("*** Cluster");
        listen(port);
    }
}

function listen(port)
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