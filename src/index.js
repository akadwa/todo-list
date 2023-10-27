import './styles/styles.css';

import { makeTodo, removeTodo, displayEditableTodo, viewTodo, editTodo, displayTodoCollection, displayWeeklyTodos, displayMonthlyTodos, displayTodayTodos, displayAllTodos, loadTodoArray, toggleDeleteBtn, setIsCompleted } from './functions/todo';
import { openModal, closeModal } from './functions/modal';
import { makeCollection, removeCollection, displayAllCollections, loadCollectionArray } from './functions/collection';

const modalCancelBtn = document.querySelector("#modal-cancel-btn");
const addTodoBtn = document.querySelector(".todo-add-btn");
const addCollectionBtn = document.querySelector(".collection-add-btn");
const modalAddBtn = document.querySelector("#modal-add-btn");
const modalTodoForm = document.querySelector(".modal-todo-form-container");
const modalCollectionForm = document.querySelector(".modal-collection-form-container");
const collectionsContainer = document.querySelector(".new-collections-container");
const todosContainer = document.querySelector(".todo-container");
const defaultTodosContainer = document.querySelector(".default-todos");

// Variables to store current data
let collectionID;
let collectionItem;
let todoItemID;
let todoItem;

// ALL OF THE FOLLOWING ARE EVENT LISTENERS

// Load todosArray and collectionsArray from localStorage, and displays each todo and collection
window.addEventListener("load", () => {
  loadTodoArray();
  displayAllTodos();
  loadCollectionArray();
  displayAllCollections();
});

// Open modal
addTodoBtn.addEventListener("click", () => {
  openModal("Todo");
});

addCollectionBtn.addEventListener("click", () => {
  openModal("Collection");
});

// Close modal
modalCancelBtn.addEventListener("click", closeModal);

// Modal functionality
modalAddBtn.addEventListener("click", () => {
  if (!modalCollectionForm.classList.contains("hidden")) {
    makeCollection();
  } else if (!modalTodoForm.classList.contains("hidden")) {
    if (modalAddBtn.innerHTML === `Add`) {
      makeTodo();
    } else {
      editTodo(todoItemID, todoItem);
    }
  }
});

collectionsContainer.addEventListener("click", (e) => {
  const collectionDeleteBtn = e.target;

  // Delete collection
  if (collectionDeleteBtn && collectionDeleteBtn.matches("button.remove-collection-btn")) {
    collectionID = collectionDeleteBtn.parentNode.dataset.id;
    removeCollection(collectionID);
    collectionItem = collectionDeleteBtn.parentNode;
    collectionItem.remove();
  }

  const collectionDiv = e.target;

  // Display collection
  if (collectionDiv && collectionDiv.matches("div.collection")) {
    const collectionName = collectionDiv.innerText.slice(0, -2);
    displayTodoCollection(collectionName);
    toggleDeleteBtn();
  }
})

todosContainer.addEventListener("click", (e) => {
  const todoDeleteBtn = e.target;

  // Delete todo
  if (todoDeleteBtn && todoDeleteBtn.matches("button.delete-btn")) {
    todoItemID = todoDeleteBtn.parentNode.parentNode.dataset.id;
    removeTodo(todoItemID);
    todoItem = todoDeleteBtn.parentNode.parentNode;
    todoItem.remove();
  }

  const todoEditBtn = e.target;

  // Edit todo
  if (todoEditBtn && todoEditBtn.matches("button.edit-btn")) {
    todoItemID = todoEditBtn.parentNode.parentNode.dataset.id;
    todoItem = todoEditBtn.parentNode.parentNode;
    openModal("Edit");
    displayEditableTodo(todoItemID);
  }

  const todoViewBtn = e.target;

  // View todo
  if (todoViewBtn && todoViewBtn.matches("button.view-btn")) {
    todoItemID = todoViewBtn.parentNode.parentNode.dataset.id;
    openModal("View");
    viewTodo(todoItemID);
  }
})

todosContainer.addEventListener("change", (e) => {
  const checkBox = e.target;

  // Changes checkbox value in todo object
  if (checkBox && checkBox.matches("input[type='checkbox']")) {
    todoItemID = checkBox.parentNode.parentNode.parentNode.dataset.id;
    todoItem = checkBox.parentNode.parentNode.parentNode;

    if (checkBox.checked) {
      setIsCompleted(todoItemID, true)
    } else {
      setIsCompleted(todoItemID, false)
    }
  }
})

defaultTodosContainer.addEventListener("click", (e) => {
  const allTodos = e.target;

  // Display all todos
  if (allTodos && allTodos.matches("div.all-todos")) {
    displayAllTodos();
    toggleDeleteBtn();
  }

  const todayTodos = e.target;

  // Display today's todos
  if (todayTodos && todayTodos.matches("div.today-todos")) {
    displayTodayTodos();
    toggleDeleteBtn();
  }

  const thisWeekTodos = e.target;

  // Display this week's todos
  if (thisWeekTodos && thisWeekTodos.matches("div.week-todos")) {
    displayWeeklyTodos();
    toggleDeleteBtn();
  }

  const thisMonthTodos = e.target;

  // Display this month's todos
  if (thisMonthTodos && thisMonthTodos.matches("div.month-todos")) {
    displayMonthlyTodos();
    toggleDeleteBtn();
  }
})
