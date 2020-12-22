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
app.get("/api/employees",async (req,res,next) => {
    data = await Employee.find()
    res.json(data)
})

/* GET ONE */
app.get("/api/employees/:id",async (req,res,next) => {
    let id = req.params.id;
    data = await Employee.findById(id)
    res.json(data)
})


/* DELETE ONE */
app.delete("/api/employees/:id",async (req,res,next) => {
    let id = req.params.id;
    data =  await Employee.findByIdAndRemove(id)
    res.json(data)
})

/* ADD ONE */
app.post("/api/employees",async (req,res,next) => {
    let new_object = req.body;
    data = await Employee.create(new_object);
    res.json(data)
})

/* UPDATE ONE */
app.put("/api/employees/:id",async (req,res,next) => {
    let updated_object = req.body;
    let id = req.params.id;
    data = await Employee.findByIdAndUpdate(id,updated_object,{new: true})
    res.json(data)
})

/* END - REST APIs */


app.use(express.static(path.join(__dirname,"templates")))

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => `Server is listening on ${PORT}`);


