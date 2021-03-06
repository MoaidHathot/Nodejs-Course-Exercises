const http = require('http');

function testLoop(count, url, port)
{    
    for(var index = 0; index < count; ++index)
    {	  
        const i = index;
        console.log(`*** Client: Start ${i}`);
        getAsync(url).then(() => console.log(`*** Client: Finish ${i}`));
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