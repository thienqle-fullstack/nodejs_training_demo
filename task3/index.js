/*
 [x] install http nodemon
 [x] install express
 [ ] require path module so we can load html file
 
 */
 const express = require('express');
 const path = require('path');

 const app = express();

 app.use('/css', express.static(path.join(__dirname,"templates/css")))

 app.get('/',function (req,res) {
     //Dir path of our project, foldername public, and template name
     res.sendFile(path.join(__dirname,'templates','index.html'))
 })

 app.get('/about',function (req,res) {
    //Dir path of our project, foldername public, and template name
    res.sendFile(path.join(__dirname,'templates','about.html'))
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => `Server is listening on ${PORT}`);
