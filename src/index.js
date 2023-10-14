import './styles/styles.css';

import { todoArray, Todo } from './functions/todo';
import { openModal, closeModal } from './functions/modal';
import { makeCollection } from './functions/collection';


const modalCancelBtn = document.querySelector("#modal-cancel-btn");
const addTodoBtn = document.querySelector(".todo-add-btn");
const addCollectionBtn = document.querySelector(".collection-add-btn");
const modalAddBtn = document.querySelector("#modal-add-btn");
const modalTodoForm = document.querySelector(".modal-todo-form-container");
const modalCollectionForm = document.querySelector(".modal-collection-form-container");

// TESTING
// const newTodo = Todo('run', 'today');
// newTodo.addToArray();
// const newTodo2 = Todo('run', 'today');
// newTodo2.addToArray();
// const newTodo3 = Todo('bacll', 'yesterday');
// newTodo3.addToArray();
// console.log(todoArray);

// TESTING

addTodoBtn.addEventListener("click", () => {
  openModal("Todo")
});

addCollectionBtn.addEventListener("click", () => {
  openModal("Collection");
});

modalCancelBtn.addEventListener("click", closeModal);

modalAddBtn.addEventListener("click", () => {
  if (!modalCollectionForm.classList.contains("hidden")) {
    makeCollection();
  } else if (!modalTodoForm.classList.contains("hidden")) {
    // console.log("HJ");
  }
});
