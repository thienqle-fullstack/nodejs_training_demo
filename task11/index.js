const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const app = express();
const bcrypt = require('bcrypt');
/*
var cors = require('cors')

var corsOptions = {
    origin:false,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
*/

//Different ways for cors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
next();});

/* START - DATABASE */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employees',{ useNewUrlParser: true,
                                        useFindAndModify: true,
                                        useUnifiedTopology: true })
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
/* START - JWT */

//Temporary username and pass
let users = [
    {'id': 1,'username': "admin","password":"admin"}
]

//hashing default password and replace the plaintext
let hashSalt = 0 //bcript required hashsalt
bcrypt.hash("admin",hashSalt,function(err,hash){
    users[0].password = hash
    // console.log(users)
})



app.post('/register',(req,res) =>{
    let user = req.body;
    if(user==null || user==undefined){
        res.status(401).send("Invalid user data!")
    }
    user.id=users.length+1
    //Hash user password
    bcrypt.hash(user.password,hashSalt,function(err,hash){
        user.password = hash
        users.push(user);
        res.status(200).send({'msg':'You have been sucssefully registered!'})    
    })
    
})

app.post('/login',(req,res) => {
    let user = req.body
    if(user==null || user==undefined){
        res.status(401).send("Invalid user data!")
        return;
    }
    let userID = 0;
    for(let i=0;i<users.length;i++){
        //If we find the user compare their hashed password
        if(user.username==users[i].username){
            userID = i;
            break;            
        }
    }
    bcrypt.compare(user.password, users[userID].password, function(err, valid) {
        if(valid){
            let payload = {subject:userID}
            let token = jwt.sign(payload,'secretKey')
            return res.status(200).send({token})
        } else {
            return res.status(400).send({"msg":"Login Failed!"})
        }
    });
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
    //You can check if current username match with userid to make sure this user used its token to access (not stolen)
    next()
}

//Getting data with this route need a token
app.get('/user',verifyToken,(req,res) =>{
    let userList = []
    let token = req.headers.authorization.split(' ')[1]
    users.forEach(element => {
        user = {
            "userID": element.id,
            "username": element.username,
            "password": element.password
        }
        userList.push(user);
    });
    res.json(userList)
})
/* END - JWT */

app.use(express.static(path.join(__dirname,"templates")))

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => console.log(`Server is listening on ${PORT}`));