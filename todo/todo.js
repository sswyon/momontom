const toDoForm = document.getElementById("js-todoForm"),
  toDoList = document.getElementById("js-pending"),
  finishedList = document.getElementById("js-finished"),
  toDoInput = toDoForm.querySelector("input"),
  menu = document.getElementById("js-menu"),
  sidebar = document.querySelector(".left");

const HIDING_CN = "hiding";

const TODOS_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let pendingTasks, finishedTasks;

function getTaskObject(text) {
  return {
    id: String(Date.now()),
    text,
  };
}

function savePendingTask(task) {
  pendingTasks.push(task);
}

function findInFinished(taskId) {
  return finishedTasks.find(function (task) {
    return task.id === taskId;
  });
}

function findInPending(taskId) {
  return pendingTasks.find(function (task) {
    return task.id === taskId;
  });
}

function removeFromPending(taskId) {
  pendingTasks = pendingTasks.filter(function (task) {
    return task.id !== taskId;
  });
}

function removeFromFinished(taskId) {
  finishedTasks = finishedTasks.filter(function (task) {
    return task.id !== taskId;
  });
}

function addToFinished(task) {
  finishedTasks.push(task);
}

function addToPending(task) {
  pendingTasks.push(task);
}

function deleteTask(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromFinished(li.id);
  removeFromPending(li.id);
  saveState();
}

function handleFinishClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  addToFinished(task);
  paintFinishedTask(task);
  saveState();
}

function handleBackClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  removeFromFinished(li.id);
  addToPending(task);
  paintPendingTask(task);
  saveState();
}

function buildGenericLi(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  span.innerText = task.text;
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTask);
  li.append(span, deleteBtn);
  li.id = task.id;
  return li;
}

function paintPendingTask(task) {
  const genericLi = buildGenericLi(task);
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✅";
  completeBtn.addEventListener("click", handleFinishClick);
  genericLi.append(completeBtn);
  toDoList.append(genericLi);
}

function paintFinishedTask(task) {
  const genericLi = buildGenericLi(task);
  const backBtn = document.createElement("button");
  backBtn.innerText = "🔙";
  backBtn.addEventListener("click", handleBackClick);
  genericLi.append(backBtn);
  finishedList.append(genericLi);
}

function saveState() {
  localStorage.setItem(TODOS_LS, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedTasks));
}

function loadState() {
  pendingTasks = JSON.parse(localStorage.getItem(TODOS_LS)) || [];
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED_LS)) || [];
}

function restoreState() {
  pendingTasks.forEach(function (task) {
    paintPendingTask(task);
  });
  finishedTasks.forEach(function (task) {
    paintFinishedTask(task);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const taskObj = getTaskObject(toDoInput.value);
  toDoInput.value = "";
  paintPendingTask(taskObj);
  savePendingTask(taskObj);
  saveState();
}

function toggleSideBar() {
  sidebar.classList.toggle("hide");
}

function init() {
  const cuurentUser = localStorage.getItem(USER_LS);
  if (!cuurentUser) {
    toDoForm.classList.add(HIDING_CN);
  }
  menu.addEventListener("click", toggleSideBar);
  toDoForm.addEventListener("submit", handleFormSubmit);
  loadState();
  restoreState();
}
init();
