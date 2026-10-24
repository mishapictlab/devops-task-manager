// Load saved tasks when page opens
window.onload = function() {
    loadTasks();
};

// Add a new task
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    createTask(task, false);
    saveTasks();

    input.value = "";
}

// Create task element
function createTask(task, completed) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task;

    if (completed) {
        span.classList.add("completed");
    }

    // Mark task as completed
    span.onclick = function() {
        span.classList.toggle("completed");
        saveTasks();
    };

    // Delete task
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = function() {
        li.remove();
        saveTasks();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

// Save tasks in localStorage
function saveTasks() {
    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load saved tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task.text, task.completed);
    });
}