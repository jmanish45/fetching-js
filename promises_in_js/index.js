const getPromise = ()=> {
    return new Promise((resolve, reject) => {
        console.log("I am a Promise");
        //resolve("Success");  //if resolved
        //reject("Failure"); //if rejected
    });

};
//if resolved
let promise = getPromise() ;
promise.then((res) => {
    console.log("promise fullfilled", res);
}); 

//if rejected
promise.catch((err) => {
    console.log("rejected", err);
})


function asyncFunc1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Got data1");
            resolve("success");
            //reject("failure");
        }, 4000);
    });
}
function asynFunc2(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Got data2");
            resolve("success");
        }, 4000);
    })
}

console.log('fetching data1....') ;
let p1 = asyncFunc1();
p1.then((res) => {
    console.log(res);
    console.log("fetching  data2......")
    let p2 = asynFunc2();
    p2.then((res) => {
        console.log(res);
    })
});
