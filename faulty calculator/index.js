let random = Math.random();

let a = prompt("Enter first numser : ")
let b = prompt("Enter operation to perform : ")
let c =prompt("Enter second number :")

let obj = {
    "+" : "-",
    "-" : "+",
    "*" : "/",
    "/" : "*",

}
 if(random  > 0.1) {
    alert(`the result is ${eval(`${a} ${b} ${c}`)}`)
 }
 else {
    b = obj[b];
    alert(`the faulty result is ${eval(`${a} ${b} ${c}`)}`)
 }