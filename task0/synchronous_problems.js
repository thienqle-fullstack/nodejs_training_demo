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
/* Run normally */
// console.log("Run in sequence")
// myfunction1(myfunction2);

/* Run with promises */
console.log("Run with promise")
function handleError(){
    console.log("Some thing wrong!")
}

myfunction1().then(myfunction2).catch(handleError);

/* Run with async/await */
console.log("Run with async/await");
// Create a wrap around function with async 
// to sync all of async function 

// function myfunction3(msg){
//     console.log(msg);
//     setTimeout(()=>{
//         console.log("From function 3!");
//     },2000);
// }

// function myfunction4(msg){
//     setTimeout(()=>{
//         console.log(msg);
//         console.log("From function 4!");
//     },1000);
// }

// function myfunction5(msg){
//     setTimeout(()=>{
//         console.log(msg);
//         console.log("From function 5!");
//     },500);
// }

// (async ()=>{
//     a = await myfunction3("hello");
//     b = await myfunction4(a);
//     c= await myfunction5(b);
// })() 