// load module http = core module 
const http = require('http');
const port = process.env.PORT || 1337;

const product = {
   id: 1,
   names: "Laptop Dell",
   price: 1500.00,
   variant: {
       type : "Gamer",
       core : "i7 Core"
   }
}

// createServer method has 2 param => request(req), respond(res)
const server = http.createServer(function(req, res){
   res.setHeader("Content-Type", "application/json");
   res.end(JSON.stringify(product));
});

// open port server di 1337
server.listen(port);
console.log(`Server Listening on port ${port}`);