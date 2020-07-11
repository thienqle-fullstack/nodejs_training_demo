/* export literals (For example, a string) */
module.exports = "hello"
// or different syntax
// exports = "hello world"

/* export object */
module.exports = {msg : "hello world"}


/* export function */
module.exports = function myFunction(msg) {
    console.log(msg)
}

/* Last exports will override all above exports */
/*  You can export everthing of a js file in one object */
module.exports = {

    myVariable: "Hello from variable",
    myFunction1: function myFunction() {
                    console.log("Hello from function 1")
                },
    myFunction2: (msg) => {
                    console.log(msg)
                }

}