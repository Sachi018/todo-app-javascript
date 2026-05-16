function updateCount() {
    let tasks = document.querySelectorAll("#taskList li");
    document.getElementById("taskCount").innerText =
        "Tasks: " + tasks.length;
}

function addTask() {

    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if(taskText === "") {
        alert("Enter a task!");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = `
        <span onclick="toggleTask(this)">
            ${taskText}
        </span>

        <div>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    document.getElementById("taskList").appendChild(li);

    input.value = "";

    updateCount();

    saveTasks();
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();

    updateCount();

    saveTasks();
}

function toggleTask(task) {
    task.classList.toggle("completed");

    saveTasks();
}

function editTask(button) {

    let task = button.parentElement.previousElementSibling;

    let newTask = prompt("Edit Task:", task.innerText);

    if(newTask !== null) {
        task.innerText = newTask;
    }

    saveTasks();
}

function saveTasks() {
    localStorage.setItem(
        "tasks",
        document.getElementById("taskList").innerHTML
    );
}

function loadTasks() {

    document.getElementById("taskList").innerHTML =
        localStorage.getItem("tasks") || "";

    updateCount();
}

loadTasks();