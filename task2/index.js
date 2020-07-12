/*
 [x] install http nodemon
 [x] install express
 [x] create same hello world with express
 [x] adding path
 
 */

 const express = require('express');
 const app = express();

 app.get('/',function (req,res) {
    //  res.writeHead(200,{'Content-type':'text/html'}) //Let the browser know we are using html
    //  res.write("<h1 style='text-align:center; color:blue'>hello</h1>")
    //  res.end()
    res.send("<h1 style='text-align:center; color:blue'>hello</h1>")
 })

 app.listen(3000);
