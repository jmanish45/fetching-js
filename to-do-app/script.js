const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("lists");
const addBtn = document.querySelector(".add");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.querySelector(".clear-completed");
const clearAllBtn = document.querySelector(".clear-all");

let currentFilter = "all";

function addTask() {
    if(inputBox.value === "") {
        alert("Please enter a task!");
        return;
    }
    
    const li = document.createElement("li");
    const taskId = Date.now();
    
    li.innerHTML = `
        <div class="task-content">
            <input type="checkbox" class="task-checkbox" onchange="toggleTask(${taskId})">
            <span class="task-text">${inputBox.value}</span>
        </div>
        <div class="task-actions">
            <button class="edit-btn" onclick="editTask(${taskId})">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="delete-btn" onclick="deleteTask(${taskId})">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `;
    
    li.setAttribute("data-id", taskId);
    listContainer.appendChild(li);
    inputBox.value = "";
    
    saveData();
    updateStats();
}

function toggleTask(id) {
    const task = document.querySelector(`li[data-id="${id}"]`);
    task.classList.toggle("checked");
    saveData();
    updateStats();
    applyFilter();
}

function editTask(id) {
    const task = document.querySelector(`li[data-id="${id}"]`);
    const taskText = task.querySelector(".task-text");
    const newText = prompt("Edit task:", taskText.textContent);
    
    if(newText !== null && newText.trim() !== "") {
        taskText.textContent = newText;
        saveData();
    }
}

function deleteTask(id) {
    const task = document.querySelector(`li[data-id="${id}"]`);
    task.style.animation = "slideOut 0.3s ease";
    
    setTimeout(() => {
        task.remove();
        saveData();
        updateStats();
        checkEmpty();
    }, 300);
}

function updateStats() {
    const allTasks = listContainer.querySelectorAll("li");
    const completedTasks = listContainer.querySelectorAll("li.checked");
    const pendingTasks = allTasks.length - completedTasks.length;
    
    document.getElementById("total-tasks").textContent = allTasks.length;
    document.getElementById("completed-tasks").textContent = completedTasks.length;
    document.getElementById("pending-tasks").textContent = pendingTasks;
}

function applyFilter() {
    const tasks = listContainer.querySelectorAll("li");
    
    tasks.forEach(task => {
        switch(currentFilter) {
            case "all":
                task.style.display = "flex";
                break;
            case "pending":
                task.style.display = task.classList.contains("checked") ? "none" : "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("checked") ? "flex" : "none";
                break;
        }
    });
    
    checkEmpty();
}

function checkEmpty() {
    const visibleTasks = Array.from(listContainer.querySelectorAll("li")).filter(
        task => task.style.display !== "none"
    );
    
    const existingEmpty = listContainer.querySelector(".empty-state");
    if(existingEmpty) existingEmpty.remove();
    
    if(visibleTasks.length === 0) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "empty-state";
        emptyDiv.innerHTML = `
            <i class="fa-solid fa-inbox"></i>
            <p>No tasks to show</p>
        `;
        listContainer.appendChild(emptyDiv);
    }
}

function clearCompleted() {
    const completedTasks = listContainer.querySelectorAll("li.checked");
    completedTasks.forEach(task => task.remove());
    saveData();
    updateStats();
    checkEmpty();
}

function clearAll() {
    if(confirm("Are you sure you want to delete all tasks?")) {
        listContainer.innerHTML = "";
        saveData();
        updateStats();
        checkEmpty();
    }
}

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function loadData() {
    const savedTasks = localStorage.getItem("tasks");
    if(savedTasks) {
        listContainer.innerHTML = savedTasks;
    }
    updateStats();
    checkEmpty();
}

addBtn.addEventListener("click", addTask);

inputBox.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        addTask();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-filter");
        applyFilter();
    });
});

clearCompletedBtn.addEventListener("click", clearCompleted);
clearAllBtn.addEventListener("click", clearAll);

loadData();