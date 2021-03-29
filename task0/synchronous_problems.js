function myfunction1(callback){
    //console.log("From function 1!")
    setTimeout(()=>{console.log("From function 1!")},2000);
    callback()
}

function myfunction2(){
    console.log("From function 2!")
}

/* Run normally */
// console.log("Run in sequence")
// myfunction1(myfunction2);

/* Run with promises */
console.log("Run with promise")
function handleError(){
    console.log("Some thing wrong!")
}

let myPromise = new Promise((resolve,reject) =>
    resolve()
)

myPromise.then(myfunction1)
        .then(myfunction2)
        .catch(handleError);

/* Run with async/await */
console.log("Run with async/await");
// Create a wrap around function with async 
// to sync all of async function 

// (async ()=>{
//     await myfunction1();
//     await myfunction2();
//     await myfunction3();
// })() 