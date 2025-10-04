let modebtn = document.querySelector("#mode");
let currmode = "light";
let  body =  document.querySelector("body");

modebtn.addEventListener("click", () => {
    if(currmode === "light") {
        currmode = "dark";
        body.classList.add("dark");
        modebtn.innerText = "Light Mode";
        body.classList.remove("light");
    }
    else {
        currmode = "light";
        body.classList.add("light");
        modebtn.innerText = "Dark Mode";
        body.classList.remove("dark");
    }
} )