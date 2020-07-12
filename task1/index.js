/*
 [x] install http package
 [x] create a http server

 */

 const http = require('http');

 server = http.createServer(function (req,res) {
     res.writeHead(200,{'Content-type':'text/html'}) //Let the browser know we are using html
     res.write("<h1 style='text-align:center; color:blue'>hello</h1>")
     res.end()
 })

 
 server.listen(3000,() => { 
    console.log("Server is running at port: 3000")
 });


 /* If we want to make a website */
 /* We can do this */

//  http.createServer(function (req,res) {
//     res.writeHead(200,{'Content-type':'text/html'}) //Let the browser know we are using html
//     res.write("<h2>hello</h2>")
//     res.end()
// }).listen(3000);

/* */