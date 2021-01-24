const greetingForm = document.querySelector(".js-greetingForm"),
  inputName = greetingForm.querySelector("input"),
  greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  const currentValue = inputName.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askFormName() {
  greetingForm.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  greetingForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const cuurentUser = localStorage.getItem(USER_LS);
  if (cuurentUser === null) {
    askFormName();
  } else {
    paintGreeting(cuurentUser);
  }
}

function init() {
  loadName();
}

init();
