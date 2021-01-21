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
            contentDiv.innerHTML = 'This is a about page';
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
    let url = new URL('http://localhost:4000/employee')
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
    let url = new URL('http://localhost:4000/employee')
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
    `<table>
        <tr>
            <th>ID</th>
            <td>${data.id}</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>${data.name}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>${data.email}</td>
        </tr>
        <tr>
            <th>Salary</th>
            <td>${data.salary}</td>
        </tr>
    </table>`
    return output
}

function displayTable(list){
    output = '<table style="border: 1px solid black;">'
    output += '<tr>'
    output += '<th>id</th>'
    output += '<th>name</th>'
    output += '<th>email</th>'
    output += '<th>salary</th>'
    output += '<th></th>'
    output += '</tr>'
    list.forEach(element => {
        output += '<tr>'
        output += '<td><a href="#detail?id=' + element.id +  '">' + element.id + '</a></td>'
        output += '<td>' + element.name + '</td>'
        output += '<td>' + element.email + '</td>'
        output += '<td>' + element.salary + '</td>'
        output += '<td><a href="#detail?id=' + element.id +  '">Detail</a></td>'
        output += '<td><a style="color: red" href="#remove?id=' + element.id +  '">Delete</a></td>'
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
        `
        <form action="POST" id='employee_form'>
            <label>Id: </label> &nbsp;
            <input type="text" name="id" placeholder="ID"/>
            
            <br/><br/>
            <label>Name: </label> &nbsp;
            <input type="text" name="name" placeholder="Name"/>
            <br/><br/>
            <label>Email: </label> &nbsp;
            <input type="text" name="email" placeholder="Email"/>
            <br/><br/>
            <label>Salary: </label> &nbsp;
            <input type="text" name="salary" placeholder="Salary"/>
            <br/><br/>
            <button type="submit">Submit</button>
        </form>
        `
    contentDiv.innerHTML = employee_form

    // Access the form element
    const form = document.getElementById("employee_form");

    
    // Take over form submit event.
    form.addEventListener( "submit", function ( event ) {
        event.preventDefault();
        
        let xhr = new XMLHttpRequest();
       
        let url = new URL('http://localhost:4000/employee');
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        let formData = new FormData(form);
        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var jsonData = JSON.stringify(object);
        xhr.onload=function() {
            location.hash = "#home";
            // alert(this.response);
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
    let url = new URL('http://localhost:4000/employee')
    xhr.open('DELETE', url + "/" + id);
    xhr.send();
    let output = '';
    xhr.onload = function() {
        if (xhr.status != 200) { 
            alert(`Error ${xhr.status}: ${xhr.statusText}`); 
        } else { 
            //xhr.response is the result body
            data = JSON.parse(xhr.response)
            contentDiv.innerHTML = "Object has been deleted!"
        }
    };       
}