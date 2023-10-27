import { closeModal, openModal, toggleReadOnly } from "./modal";
import { displayCollectionName } from "./collection";
import { isThisISOWeek, isThisMonth, isToday, parseISO } from "date-fns";

const todoNameInput = document.querySelector("#todo-name");
const collectionNameDisplay = document.querySelector("#collection-name-display");
const todoCheckBoxInput = document.querySelector("#todo-check");
const todoDateInput = document.querySelector("#todo-date");
const todoDescriptionInput = document.querySelector("#todo-description");
const todoPriorityInput = document.querySelector("#todo-priority");
const todoContainer = document.querySelector(".todo-container");
const addTodoBtn = document.querySelector(".todo-add-btn");


let todoArray = [];

const Todo = (name, collection, isCompleted, date, description, priority) => {
  const todo = {};

  todo.id = todoArray.length;
  todo.name = name;
  todo.collection = collection;
  todo.isCompleted = isCompleted;
  todo.date = date;
  todo.description = description;
  todo.priority = priority;

  return todo;
}

const addTodoToArray = (todo) => {
  todoArray.push(todo);

  saveTodoArray();
}

const removeTodoFromArray = (todo) => {
  todoArray.splice(todo, 1);

  saveTodoArray();
}

const setIsCompleted = (todoID, isCompletedBoolean) => {
  todoArray.forEach(todo => {
    if (todoID == todo.id) {
      todo.isCompleted = isCompletedBoolean;
    }
  })

  saveTodoArray();
}


const editTodo = (todoID, todoItem) => {
  todoArray.forEach(todo => {
    if (todoID == todo.id) {
      todo.name = todoNameInput.value;
      todo.date = todoDateInput.value;
      todo.description = todoDescriptionInput.value;
      todo.priority = todoPriorityInput.value;

      const todoItemName = todoItem.querySelector("label");
      todoItemName.innerHTML = todo.name;

      const todoItemDate = todoItem.querySelector(".date");
      todoItemDate.innerHTML = todo.date;

      displayPriorityColor(todoID, todoItem);
    }
  })

  saveTodoArray();

  closeModal();
}

const viewTodo = (todoID) => {
  displayEditableTodo(todoID);
  toggleReadOnly();
}

const makeTodo = () => {
  const name = todoNameInput.value;
  const collection = collectionNameDisplay.innerHTML;
  const isCompleted = todoCheckBoxInput.checked;
  const date = todoDateInput.value;
  const description = todoDescriptionInput.value;
  const priority = todoPriorityInput.value;

  if (name !== "" && collection !== "" && isCompleted !== "" && date !== "" && description !== "" && priority !== "") {
    const newTodo = Todo(name, collection, isCompleted, date, description, priority);
    addTodoToArray(newTodo);
    displayTodo(newTodo);
    closeModal();
  } else {
    alert("All fields must be filled in!");
  }
}

const removeTodo = (todoID) => {
  todoArray.forEach(todoItem => {
    if (todoID == todoItem.id) {
      removeTodoFromArray(todoItem);
    }
  })
}

const removeAllTodosFromCollection = (collection) => {
  todoArray.forEach(todo => {
    if (todo.collection == collection.name) {
      removeTodoFromArray(todo);
    }
  })
}

const toggleDeleteBtn = () => {
  if (collectionNameDisplay.innerHTML == `Today` || collectionNameDisplay.innerHTML == `This week` || collectionNameDisplay.innerHTML == `This month`) {
    if (!addTodoBtn.classList.contains('hidden')) {
      addTodoBtn.classList.add('hidden');
    }
  } else {
    addTodoBtn.classList.remove('hidden');
  }
}

const displayTodo = (todo) => {
  const todoItemContainer = document.createElement('div');
  todoItemContainer.classList.add('todo-item');
  todoItemContainer.setAttribute("data-id", todo.id);
  todoItemContainer.classList.add(todo.priority);

  const todoInfoContainer = document.createElement('div');
  todoInfoContainer.classList.add('item-info-container');

  const todoInfo = document.createElement('div');
  todoInfo.classList.add('item-info');
  const checkBoxInput = document.createElement('input');
  checkBoxInput.setAttribute("type", "checkbox");
  checkBoxInput.setAttribute("name", `${todo.name}-check`);
  checkBoxInput.setAttribute("id", `${todo.name}-check`);
  checkBoxInput.checked = todo.isCompleted;
  const checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute("for", `${todo.name}-check`);
  checkboxLabel.innerHTML = todo.name;
  todoInfo.appendChild(checkBoxInput);
  todoInfo.appendChild(checkboxLabel);

  const dateDisplay = document.createElement('div');
  dateDisplay.classList.add('date');
  dateDisplay.innerHTML = todo.date;

  todoInfoContainer.appendChild(todoInfo);
  todoInfoContainer.appendChild(dateDisplay);

  const controllerDisplay = document.createElement('div');
  controllerDisplay.classList.add('controller-div');

  const viewBtn = document.createElement('button');
  viewBtn.classList.add('view-btn')
  viewBtn.innerHTML = `View`;

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-btn')
  editBtn.innerHTML = `Edit`;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn')
  deleteBtn.innerHTML = `Delete`;

  controllerDisplay.appendChild(viewBtn);
  controllerDisplay.appendChild(editBtn);
  controllerDisplay.appendChild(deleteBtn);


  todoItemContainer.appendChild(todoInfoContainer);
  todoItemContainer.appendChild(controllerDisplay);

  todoContainer.appendChild(todoItemContainer);
}

const displayTodoCollection = (collectionName) => {
  displayCollectionName(collectionName);
  todoContainer.innerHTML = ``;

  todoArray.forEach(todo => {
    if (todo.collection == collectionName) {
      displayTodo(todo);
    }
  })
}

const displayWeeklyTodos = () => {
  displayCollectionName("This week");
  todoContainer.innerHTML = ``;

  todoArray.forEach(todo => {
    if (isThisISOWeek(parseISO(todo.date))) {
      displayTodo(todo);
    }
  })
}

const displayMonthlyTodos = () => {
  displayCollectionName("This month");
  todoContainer.innerHTML = ``;

  todoArray.forEach(todo => {
    if (isThisMonth(parseISO(todo.date))) {
      displayTodo(todo);
    }
  })
}

const displayTodayTodos = () => {
  displayCollectionName("Today");
  todoContainer.innerHTML = ``;

  todoArray.forEach(todo => {
    if (isToday(parseISO(todo.date))) {
      displayTodo(todo);
    }
  })
}

const displayAllTodos = () => {
  displayCollectionName("All");
  todoContainer.innerHTML = ``;

  todoArray.forEach(todo => {
    displayTodo(todo);
  })
}

const displayEditableTodo = (todoID) => {
  todoArray.forEach(todoItem => {
    if (todoID == todoItem.id) {
      todoNameInput.value = todoItem.name;
      todoDateInput.value = todoItem.date;
      todoDescriptionInput.value = todoItem.description;
      todoPriorityInput.value = todoItem.priority;
    }
  })
}


const displayPriorityColor = (todoID, todoItem) => {
  if (todoItem.classList.contains("low") || todoItem.classList.contains("medium") || todoItem.classList.contains("high")) {
    todoItem.classList.remove("low");
    todoItem.classList.remove("medium");
    todoItem.classList.remove("high");
  }

  todoArray.forEach(todo => {
    if (todo.id == todoID) {
      todoItem.classList.add(todo.priority);
    }
  })
}

// Saves todoArray to localStorage
const saveTodoArray = () => {
  let stringified = JSON.stringify(todoArray);
  localStorage.setItem("todoArray", stringified);
}

// Loads todoArray from localStorage
const loadTodoArray = () => {
  let retrieved = localStorage.getItem("todoArray");
  todoArray = JSON.parse(retrieved);
  if (todoArray == null) {
    todoArray = [];
  }
}



export { makeTodo, removeTodo, removeAllTodosFromCollection, displayEditableTodo, viewTodo, editTodo, displayTodoCollection, displayWeeklyTodos, displayMonthlyTodos, displayTodayTodos, displayAllTodos, toggleDeleteBtn, saveTodoArray, loadTodoArray, setIsCompleted }
