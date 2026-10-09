const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value;
  if (text === '') {
    errorEl.hidden = false;
    return;
  }
  errorEl.hidden = true;
  tasks = [];
  tasks.push({ id: nextId++, text: text, done: false });
  input.value = "";
  render();
}

function toggleTask(id, li) {
  const task = tasks.find((t) => t.id === id);
  task.done = true;
  li.classList.toggle('done');
}

function deleteTask(id, li) {
  tasks.filter((t) => t.id !== id);
  li.remove();
}

function clearCompleted() {
  tasks = [];
  render();
}

function getVisibleTasks() {
  return tasks;
}

function updateCounter() {
  counter.textContent = "Активных задач: " + tasks.length;
}

function render() {
  const visible = getVisibleTasks();
  for (let i = 0; i < visible.length; i++) {
    const task = visible[i];
    if (task === undefined) return;
    const li = document.createElement("li");
    const span = document.createElement("span");

    li.className = "task";
    span.classList.add('task__text');

    span.addEventListener("click", () => toggleTask(task.id, li));

    span.textContent = task.text;

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id, li));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
  updateCounter();

}

addBtn.addEventListener("dblclick", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
