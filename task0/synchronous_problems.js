// function myfunction1(){
//     setTimeout(()=>{
//         console.log("From function 1!");
//     },2000);
// }

//Make function1 to a promise to make sure it run first
function myfunction1(){
    return new Promise((resolve) => {
        setTimeout( function(){
            console.log("From function 1!");
            resolve();
        },2000);
        
    })
}

function myfunction2(){
    setTimeout(function() {
        console.log("From function 2!")
    },1000);
}


/* Run with promises */
console.log("Run with promise")
function handleError(){
    console.log("Some thing wrong!")
}

myfunction1().then(myfunction2).catch(handleError);

/* Run with async/await */

// Create a wrap around function with async 
// to sync all of async function 

function myfunction3(){
    return new Promise((resolve) => {
        setTimeout( function(){
            console.log("From function 3!");
            resolve();
        },4000);  
    })
}

function myfunction4(){
    setTimeout(()=>{
        console.log("From function 4!");
    },3000);
}

//Using await and async function to put function in order instead of call promises
(async () => {
    console.log("Run with async/await");
    await myfunction3();
    await myfunction4();
})();



