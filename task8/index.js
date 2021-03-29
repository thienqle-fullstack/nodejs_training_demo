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
let users = [
    {'id': 1,'username': "admin","password":"admin"}
]

app.post('/register',(req,res) =>{
    let user = req.body;
    if(user==null || user==undefined){
        res.status(401).send("Invalid user data!")
    }
    user.id=users.length
    users.push(user);
    res.status(200).send({'msg':'You have been sucssefully registered!'})
})

app.post('/login',(req,res) => {
    let user = req.body
    if(user==null || user==undefined){
        res.status(401).send("Invalid user data!")
    }
    let valid = false;
    let userID = 0;
    for(let i=0;i<users.length;i++){
        if(user.username==users[i].username 
            && user.password == users[i].password) {
            valid = true;
            userID = users[i].id;
            break
        }
    }
    if(valid){
        let payload = {subject:userID}
        let token = jwt.sign(payload,'secretKey')
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
app.get('/user',verifyToken,(req,res) =>{
    let userList = []
    console.log(users)
    let token = req.headers.authorization.split(' ')[1]
    console.log(token)
    users.forEach(element => {
        user = {
            "userID": element.id,
            "username": element.username
        }
        userList.push(user);
    });
    res.json(userList)
})
/* END - JWT */

app.use(express.static(path.join(__dirname,"templates")))

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => `Server is listening on ${PORT}`);
