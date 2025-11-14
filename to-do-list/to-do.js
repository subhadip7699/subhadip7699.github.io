const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTaskToDOM);
}

function saveTasks() {
    const tasks = [...taskList.children].map(li => ({
        text: li.querySelector("span").innerText,
        completed: li.classList.contains("completed"),
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToDOM(task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = task.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = "✔";
    checkBtn.className = "check";
    checkBtn.onclick = () => {
        li.classList.toggle("completed");
        saveTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "✖";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => {
        li.classList.add("deleteAnim");
        setTimeout(() => {
            li.remove();
            saveTasks();
        }, 350);
    };

    actions.appendChild(checkBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actions);

    if (task.completed) li.classList.add("completed");

    taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;
    const newTask = { text: taskInput.value, completed: false };
    addTaskToDOM(newTask);
    saveTasks();
    taskInput.value = "";
});

loadTasks();
