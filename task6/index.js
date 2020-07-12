/*
 [x] install http nodemon
 [x] install express
 [x] use app.use() to load whole static folder
 [x] create hard-code data
 [x] do get all method
 [x] do get one method
 [x] do delete method
 [x] install body-parser
 [x] add method
 [x] update method
 
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

/* START - REST APIs */
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

data = [
    {"id": 1,"name":"Tim Le","age":40,"salary":35000},
    {"id": 2,"name":"Tim Ng","age":40,"salary":35000},
    {"id": 3,"name":"Miguel R","age":40,"salary":35000},
]

/* READ ALL */
app.get("/api/employees",(req,res) => {
    res.json(data);
})

/* GET ONE */
app.get("/api/employees/:id",(req,res) => {
    let id = req.params.id;
    let read_object;
    for(let i = 0;i < data.length;i++){
        if(data[i].id == id) {
            read_object = data[i];
            break;
        }
    }
    res.json(read_object);
})


/* DELETE ONE */
app.delete("/api/employees/:id",(req,res) => {
    let id = req.params.id;
    let delete_object;
    for(let i = 0;i <= data.length;i++){
        if(data[i].id == id) {
            delete_object = data[i];
            data.splice(i,1);
            break;
        }
    }
    res.json(delete_object);
})

/* ADD ONE */
app.post("/api/employees",(req,res) => {
    let created_object;
    if(req.body!==undefined){
        created_object = req.body;
        data.push(created_object);
    }

    res.json(created_object);
})

/* UPDATE ONE */
app.put("/api/employees/:id",(req,res) => {
    let new_object;
    let old_object;
    if(req.body!==undefined){
        new_object = req.body;
    }
    let id = req.params.id;
    for(let i = 0;i <= data.length;i++){
        if(data[i].id == id) {
            old_object = data[i];
            data.splice(i,1);
            data.push(new_object);
            break;
        }
    }
    res.json(new_object);
})

/* END - REST APIs */

app.use(express.static(path.join(__dirname,"templates")))

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => `Server is listening on ${PORT}`);
