const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const app = express();

/* START - DATABASE */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employees',{ useFindAndModify: true })
    .then(()=>console.log('You are now connected to database!'))
    .catch((err) => console.log(err))

const EmployeeSchema = new mongoose.Schema({
    _id: Number, //Replace default ID in mongoDB
    name: String,
    age: Number,
    salary: Number
})

Employee = mongoose.model('Employee',EmployeeSchema) //Make a model using from that schemas

/* END - DATABASE*/ 

/* START - REST APIs */
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* READ ALL */
app.get("/api/employees",(req,res,next) => {
    Employee.find(function(err,data){
        if (err) return next(err); // Pass errors to Express.
        res.json(data)
    })
})

/* GET ONE */
app.get("/api/employees/:id",(req,res,next) => {
    let id = req.params.id;
    Employee.findById(id,function(err,object){
        if (err) return next(err); // Pass errors to Express.
        res.json(object)
    })
})


/* DELETE ONE */
app.delete("/api/employees/:id",(req,res,next) => {
    let id = req.params.id;
    Employee.findByIdAndRemove(id,function(err,object){
        if (err) return next(err); // Pass errors to Express.
        res.json(object)
    })
})

/* ADD ONE */
app.post("/api/employees",(req,res,next) => {
    let new_object = req.body;
    Employee.create(new_object, function(err,object){
        if (err) return next(err); // Pass errors to Express.
        res.json(object)
    });
})

/* UPDATE ONE */
app.put("/api/employees/:id",(req,res,next) => {
    let updated_object = req.body;
    let id = req.params.id;
    Employee.findByIdAndUpdate(id,updated_object,{new: true},function(err,object){
        if (err) return next(err); // Pass errors to Express.
        res.json(object)
    })
})

/* END - REST APIs */

/* START - JWT */

//Temporary username and pass
var userId = 1;
var username;
var password;

app.post('/register',(req,res) => {
    let user = req.body
    if(user==null || user==undefined) {
        console.log(err);
        res.status(401).send('No user found')
    }
    //Save the user and send them token
    username = user.username;
    password = user.password;
    let payload = {subject:userId} 
    let token = jwt.sign(payload, 'secretKey')
    res.status(200).send({'msg':'You have been succesfully register!'})    
})

app.post('/login',(req,res) => {
    let user = req.body
    if(user==null || user==undefined) {
        console.log(err);
        res.status(401).send('No user found')
    }
    //Save the user and send them token

    if(user.username==username && user.password==password){
        let payload = {subject:userId} 
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
    } else {
        res.status(400).send({"msg":"Login Failed!"})
    }
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
}

//Getting data with this route need a token
app.get('/user',verifyToken,(req,res) => {
    data = {
        "msg":`Only authorized user can see this information`,
        "userId":`You id is ${userId}`,
        "user":`You username is ${username}`,
    }
    res.json(data)
})
/* END - JWT */

app.use(express.static(path.join(__dirname,"templates")))

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => `Server is listening on ${PORT}`);
