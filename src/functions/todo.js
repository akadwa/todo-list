const todoNameInput = document.querySelector("#todo-name");
const todoDescriptionInput = document.querySelector("#todo-description");
const todoDateInput = document.querySelector("#todo-date");
const todoPriorityInput = document.querySelector("#todo-priority")

const todoArray = [];

const Todo = (name, collection, isCompleted, date, description, priority) => {
  const todo = {};

  todo.name = name;
  todo.collection = collection;
  todo.isCompleted = isCompleted;
  todo.date = date;
  todo.description = description;
  todo.priority = priority;

  todo.addToArray = function () {
      todoArray.push(this);
  };

  todo.removeFromArray = function () {
    const todoToRemove = todoArray.findIndex((todo) => todo === this);

    if (todoToRemove !== -1) {
      todoArray.splice(todoToRemove, 1);
    }
  }

  return todo;
}

// WORK ON MAKING TODOS

// Might not need this function
// Instead could: Check for all todos that have their collection equal to the .innerHTML of the title
// const getUniqueCollections = () => {
//   let collectionNames = [];

//   todoArray.forEach(todo => {
//     collectionNames.push(todo.collection);
//   })

//   let uniqueCollectionNames = [...new Set(collectionNames)];

//   return uniqueCollectionNames;
// }

// REMOVE TODOARRAY FROM EXPORT WHEN DONE WITH TESTING
export { todoArray, Todo }
