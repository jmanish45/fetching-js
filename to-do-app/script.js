const inputBox =  document.getElementById("input-box");
const listContainer = document.getElementById("lists");
const addbtn = document.querySelector(".add");


addbtn.addEventListener("click", addTask);
inputBox.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        addTask();
    }
})

function addTask() {
    if(inputBox.value === '') {
        alert("You must write something!");
    }
    else {
        const li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
    else if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(); 
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showtask() {
    listContainer.innerHTML = localStorage.getItem("data"); 
}
showtask(); 