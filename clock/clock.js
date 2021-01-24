const clockContainer = document.querySelector(".js-clock"),
  dateTitle = document.querySelector("#js-date"),
  timeTitle = document.querySelector("#js-time");

function getTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  dateTitle.innerText = `${year}. ${month}. ${day}
  ${week[date.getDay()]}`;
  timeTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  setInterval(getTime, 1000);
}

init();