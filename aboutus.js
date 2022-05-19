const form = document.querySelector(".contact");
const alert = document.querySelector(".alert");
const message = document.getElementById("message");
const submitbutton = document.querySelector(".submit-button");
const container = document.querySelector(".message-container");
const list = document.querySelector(".message-array");
const clearbutton = document.querySelector(".clear-button");

let editElement;
let editFlag = false;
let editID = "";

message.addEventListener('keydown', e => {
  message.style.backgroundColor = "black";
  message.style.color = "white";
})

message.addEventListener('keyup', e => {
  message.style.backgroundColor = "white";
  message.style.color = "black";
})

form.addEventListener("submit", addItem);

clearbutton.addEventListener("click", clearItems);

window.addEventListener("DOMContentLoaded", setupItems);

let messages = {};

function addItem(e) {
  e.preventDefault();
  const value = message.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("message-sent");
    
    element.innerHTML = `<p class="title">${value}</p>
            <div class="button-container">
              <button type="button" class="edit-button">
              </button>
              <button type="button" class="delete-button">
              </button>
            </div>
          `;

    const deletebutton = element.querySelector(".delete-button");
    deletebutton.addEventListener("click", deleteItem);
    const editbutton = element.querySelector(".edit-button");
    editbutton.addEventListener("click", editItem);


    list.appendChild(element);

    displayAlert("message added", "success");

    container.classList.add("show-container");

    addToLocalStorage(id, value);

    setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("message changed", "success");


    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter message", "danger");
  }
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}


function clearItems() {
  const items = document.querySelectorAll(".message-sent");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("no messages", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}



function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("message removed", "danger");

  setBackToDefault();

  removeFromLocalStorage(id);
}

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;

  editElement = e.currentTarget.parentElement.previousElementSibling;

  message.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;

  submitbutton.textContent = "edit";
}

function setBackToDefault() {
  message.value = "";
  editFlag = false;
  editID = "";
  submitbutton.textContent = "submit";
}


function addToLocalStorage(id, value) {
  const message = { id, value };
  let items = getLocalStorage();
  items.push(message);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}


function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("message-sent");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="button-container">
          
              <button type="button" class="edit-button">
              </button>
              <button type="button" class="delete-button">
              </button>
            </div>
          `;

  const deletebutton = element.querySelector(".delete-button");
  deletebutton.addEventListener("click", deleteItem);
  const editbutton = element.querySelector(".edit-button");
  editbutton.addEventListener("click", editItem);


  list.appendChild(element);
}