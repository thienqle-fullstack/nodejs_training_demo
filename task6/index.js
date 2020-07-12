/*
 [x] install mongoose
 [ ] create database on mongobd 
 [ ] make mongodb connection
 [ ] 
 [ ]
 
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

/* START - DATABASE */
const mongoose = require('mongoose');
const { nextTick } = require('process');

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
    Employee.findByID(id,function(err,object){
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

app.use(express.static(path.join(__dirname,"templates")))

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => `Server is listening on ${PORT}`);
