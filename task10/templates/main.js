let about = 
`
<h3>This is a Demo of Node.js with front-end (without using framework)</h3>

[x] task0 - Callback function concept <br/>
[x] task0 - loading module <br/>
[x] task1 - hello world node.js <br/>
[x] task2 - hello world express <br/>
[x] task3 - Websites with express <br/>
[x] task4 - Static folder Websites with Express - not specify the route<br/>
[x] task5 - RESTful APIs <br/>
[x] task6 - CRUD operations with Mongoose </br>
[x] task7 - Using async/await</br>
[x] task8 - simple jwt implementation </br>
[x] *task9 - Add frontend with no JS framework </br>
[x] *task10 - Add css Tempalate that not using framework  </br>
`;

// Set up loop to detect any routing change
if(!location.hash) {
    location.hash = "#home";
}

loadContent();

window.addEventListener("hashchange", loadContent)



//Load content handle url routing
function loadContent(){

    var contentDiv = document.getElementById("app"),
    fragmentId = location.hash.substr(1);
    if(fragmentId.includes('detail')) fragmentId='detail'
    if(fragmentId.includes('remove')) fragmentId='remove'
    let params = new URLSearchParams(window.location.hash)

    switch(fragmentId)  {
        case 'home':
            getAll(contentDiv)
            break;
        case 'add':
            post(contentDiv)
            break;
        case 'detail':
            id = params.get('#detail?id')          
            get(contentDiv,id)
            break;
        case 'remove':
            id = params.get('#remove?id')          
            remove(contentDiv,id)
            break;
        case 'about':
            contentDiv.innerHTML = about;
            break;
        default:
            contentDiv.innerHTML = 'Blank page';
    } 

}
   
/* GET ALL */
function getAll(contentDiv){
    // This is your connection point to backend
    let xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    // let url = new URL('/employee')
    let url = '/api/employees'
    xhr.open('GET', url);
    xhr.send();
    let output = '';
    xhr.onload = function() {
        if (xhr.status != 200) { 
        alert(`Error ${xhr.status}: ${xhr.statusText}`); 

        } else { 
            //xhr.response is the result body
            output = JSON.parse(xhr.response)
            // getContent(contentDiv,fragmentId,output,"This is about page","Contact")
            contentDiv.innerHTML = displayTable(output)       
        }
    };
        
}

/* GET ONE */
function get(contentDiv,id){
    // This is your connection point to backend
    let xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    //let url = new URL('/employee')
    let url = '/api/employees'
    xhr.open('GET', url + "/" + id);
    xhr.send();
    let output = '';
    xhr.onload = function() {
        if (xhr.status != 200) { 
        alert(`Error ${xhr.status}: ${xhr.statusText}`); 

        } else { 
            //xhr.response is the result body
            data = JSON.parse(xhr.response)
            // getContent(contentDiv,fragmentId,output,"This is about page","Contact")
            contentDiv.innerHTML = displayObject(data)
        }
    };       
}

function displayObject(data){
    output = 
    `<table class="table-single">
        <tr>
            <th>ID</th>
            <td>${data._id}</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>${data.name}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>${data.age}</td>
        </tr>
        <tr>
            <th>Salary</th>
            <td>${data.salary}</td>
        </tr>
        <tr>
        <td>
            <input class="btn btn-primary" type="button" onclick='location.hash = "#home"' value="Back"/><br/>
        <td>
        </tr>
    </table>`
    return output
}

function displayTable(list){
    
    output = '<h3>Employee List </h3><br/>'
    output += `<input class="btn btn-success" type="button" onclick='location.hash= "#add"' value="Add new"/><br/>`
    output += `<br/>`
    output += '<table>'
    output += '<tr>'
    output += '<th>ID</th>'
    output += '<th>Name</th>'
    output += '<th>Age</th>'
    output += '<th>Salary</th>'
    output += '<th></th>'
    output += '<th></th>'
    output += '</tr>'
    list.forEach(element => {
        output += '<tr>'
        output += '<td><a href="#detail?id=' + element._id +  '">' + element._id + '</a></td>'
        output += '<td>' + element.name + '</td>'
        output += '<td>' + element.age + '</td>'
        output += '<td>' + element.salary + '</td>'
        output += '<td><a class="btn btn-primary" href="#detail?id=' + element._id +  '">Detail</a></td>'
        output += '<td><a class="btn btn-danger" href="#remove?id=' + element._id +  '">Delete</a></td>'
        output += '</tr>'
    });
    output += '</table>'
    return output
}


//Read A file - only work if host on server
/* function readOtherHtml(url) {
    console.log('Function')
    let xhr = new XMLHttpRequest(); 
    xhr.open('GET',url,true);
    xhr.onload = function() {
        console.log(xhr.response)
    };
    xhr.send();
}

readOtherHtml('form.html')
*/



function post(contentDiv){
    //Create a form
    let employee_form = 
        `<h3>Add New employee</h3>
        <table>
        <tr>
        <td>
            <form action="POST" id='employee_form'>
                <label>Id: </label> &nbsp;
                <input type="text" name="_id" placeholder="ID"/>
                
                <br/><br/>
                <label>Name: </label> &nbsp;
                <input type="text" name="name" placeholder="Name"/>
                <br/><br/>
                <label>Age: </label> &nbsp;
                <input type="text" name="age" placeholder="Age"/>
                <br/><br/>
                <label>Salary: </label> &nbsp;
                <input type="text" name="salary" placeholder="Salary"/>
                <br/><br/>
                <button class="btn btn-success" type="submit">Submit</button>
            </form>
            </td>
        </tr>
        </table>
        `
    contentDiv.innerHTML = employee_form

    // Access the form element
    const form = document.getElementById("employee_form");

    
    // Take over form submit event.
    form.addEventListener( "submit", function ( event ) {
        event.preventDefault();
        
        let xhr = new XMLHttpRequest();
        // let url = new URL('/employee');
        let url = '/api/employees'
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        let formData = new FormData(form);
        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var jsonData = JSON.stringify(object);
        xhr.onload=function() {

            if (xhr.status != 200) { 
                alert(this.response);    
            } else {
                alert('Successfully add object!');  
                location.hash = "#home";
            }
        };
        xhr.send(jsonData)
        //This is how to debug formdata
        // console.log(...data)
        
    });
}


/* DELETE */
function remove(contentDiv,id){
    console.log('function called')
    let xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    //let url = new URL('/employee')
    let url = '/api/employees'
    xhr.open('DELETE', url + "/" + id);
    xhr.send();
    let output = '';
    xhr.onload = function() {
        if (xhr.status != 200) { 
            alert(`Error ${xhr.status}: ${xhr.statusText}`); 
        } else { 
            //xhr.response is the result body
            data = JSON.parse(xhr.response)
            contentDiv.innerHTML = 
            `
            Object has been deleted!
            <br/>
            <br/>
            <input class="btn btn-primary" type="button" onclick='location.hash = "#home"' value="Back"/><br/>
            `
        }
    };       
}

