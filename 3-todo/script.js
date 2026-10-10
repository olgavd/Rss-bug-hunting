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
  tasks.push({ id: nextId++, text: text, done: false });
  input.value = "";
  render();
}

function toggleTask(id, li) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.done = !task.done;
  li.classList.toggle('done');
  updateCounter();
}

function deleteTask(id, li) {
  tasks = tasks.filter((t) => t.id !== id);
  li.remove();
  updateCounter();
}

function clearCompleted() {
  tasks = tasks.filter((t) => t.done !== true);
  render();
}

function getVisibleTasks() {
  return tasks;
}

function updateCounter() {
  let countDone = document.querySelectorAll('.task:not(.done)');
  counter.textContent = "Активных задач: " + `${countDone.length}`;
}

function render() {

  list.textContent = '';

  let visible = getVisibleTasks();

  if (currentFilter === 'active') {
    visible = visible.filter(task => task.done === false);
  } else if (currentFilter === 'done') {
    visible = visible.filter(task => task.done === true);
  }

  for (let i = 0; i < visible.length; i++) {
    const task = visible[i];
    const li = document.createElement("li");
    const span = document.createElement("span");

    if (task.done) li.classList.add('task', 'done');
    if (!task.done) li.classList.add('task');

    span.classList.add('task__text');

    span.addEventListener("click", () => toggleTask(task.id, li));

    span.textContent = task.text;

    const del = document.createElement("button");
    del.classList.add('task__del');
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id, li));

    li.append(span);
    li.append(del);
    list.append(li);
  }
  updateCounter();
}

addBtn.addEventListener("click", addTask);
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
