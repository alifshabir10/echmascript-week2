// load module http = core module 
const http = require('http');

// set port default in 1337
const port = process.env.PORT || 1337;

// createServer method has 2 param => request(req), respond(res)
const server = http.createServer(function(req, res){
    res.end("Hello Bootcamp Nodejs");
});

// open port server di 1337
server.listen(port);

console.log(`Server Listening on port ${port}`);