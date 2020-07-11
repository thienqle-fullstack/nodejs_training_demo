/*
    [ ] callback funciton is call later function
    [ ] Arrow function
    [ ] Arrow function in callback function
*/

function function1(callback){
    data = "function1"
    callback(data)
}

// function function2(){
//     console.log("function2")
// }

// function1(function2)

//Output:
//function1
//function2


//Function run immediately because you put it inside a function
(function() {
    console.log("function2")
})()

function normalFunction() {
    console.log("hello")
}

//Declare a callback function when call another function 
//function1(function function2() {console.log("function2");})

//Use arrow function instead
function1((data) => console.log(data))


