/*
 [x] install http package
 [x] create a http server

 */

 var http = require('http');

 http.createServer(function (req,res) {
     res.end("Hello world")
 }).listen(3000);
