const http = require('http');

async function testLoop(count, url, port)
{    
    for(var index = 0; index < count; ++index)
    {
        console.log(`*** Client: Start ${index}`);
        await getAsync(url);
        console.log(`*** Client: Finish ${index}`);
    }
}

function getAsync(url)
{
    return new Promise ((resolve, reject) => {

        http.get(url, response => {
            var body = '';

            response.on('data', chunk => body += chunk);
            response.on('end', () => resolve(body));

          }).on('error', reject);
      }); 
}

module.exports = {
    send: testLoop
}