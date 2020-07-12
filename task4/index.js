/*
 [x] install http nodemon
 [x] install express
 [x] using app.use() to load whole static folder

 */
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,"templates")))

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => `Server is listening on ${PORT}`);
