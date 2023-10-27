import { closeModal } from "./modal";
import { removeAllTodosFromCollection, displayAllTodos } from "./todo";

const collectionsContainer = document.querySelector(".new-collections-container");
const collectionNameInput = document.querySelector("#collection-name");
const collectionNameDisplay = document.querySelector("#collection-name-display");

let collectionArray = [];

const Collection = (name) => {
  const collection = {};

  collection.id = collectionArray.length;
  collection.name = name;

  return collection;
}

const addCollectionToArray = (collection) => {
  collectionArray.push(collection);

  saveCollectionArray();
}

const removeCollectionFromArray = (collection) => {
  const collectionToRemove = collectionArray.findIndex((collection) => collection === this);
  collectionArray.splice(collectionToRemove, 1);

  saveCollectionArray();
}

// Checks if the collection name exists already
const validateCollectionName = (collectionName) => {
  let valid = true;

  collectionArray.forEach(collection => {
    if (collection.name.toLowerCase() === collectionName.toLowerCase()) {
      valid = false;
    }
  })

  if (collectionName.toLowerCase() === "collections" || collectionName.toLowerCase() === "all" || collectionName.toLowerCase() === "today" || collectionName.toLowerCase() === "this week" || collectionName.toLowerCase() === "this month") {
    valid = false;
  }

  return valid;
}

// Makes a new collection
const makeCollection = () => {
  const collectionName = collectionNameInput.value;
  let validName = validateCollectionName(collectionName);

  if (collectionName !== "" && validName) {
    const newCollection = Collection(collectionName);
    addCollectionToArray(newCollection);
    displayCollectionInNav(newCollection);
    closeModal();
  } else if (collectionName === "") {
    alert("Collection name cannot be empty!");
  } else if (!validName) {
    alert("Invalid collection name!");
  }
}

// Removes a single collection from the collectionArray
const removeCollection = (collectionID) => {
  collectionArray.forEach(collectionItem => {
    if (collectionID == collectionItem.id) {
      removeAllTodosFromCollection(collectionItem);
      removeCollectionFromArray(collectionItem);
      displayAllTodos();
    }
  })

}


const displayCollectionInNav = (collection) => {
  const collectionDiv = document.createElement('div');
  collectionDiv.classList.add('collection');
  collectionDiv.innerHTML = `${collection.name}`;
  collectionDiv.setAttribute("data-id", collection.id);
  const removeCollectionBtn = document.createElement('button');
  removeCollectionBtn.classList.add('remove-collection-btn');
  removeCollectionBtn.innerHTML = `-`;
  collectionDiv.appendChild(removeCollectionBtn);
  collectionsContainer.append(collectionDiv);
}

// Displays the collection name
const displayCollectionName = (collectionName) => {
  collectionNameDisplay.innerHTML = collectionName;
}

// Displays all collections from the collectionArray
const displayAllCollections = () => {
  collectionArray.forEach(collection => {
    displayCollectionInNav(collection);
  })
}


// Saves collectionArray to localStorage
const saveCollectionArray = () => {
  let stringified = JSON.stringify(collectionArray);
  localStorage.setItem("collectionArray", stringified);
}

// Loads collectionArray from localStorage
const loadCollectionArray = () => {
  let retrieved = localStorage.getItem("collectionArray");
  collectionArray = JSON.parse(retrieved);
  if (collectionArray == null) {
    collectionArray = [];
  }
}


export { makeCollection, removeCollection, displayCollectionName, displayAllCollections, saveCollectionArray, loadCollectionArray }
