import { closeModal } from "./modal";

const collectionsContainer = document.querySelector(".collections-container");
const collectionElements = collectionsContainer.querySelectorAll("div");
const collectionNameInput = document.querySelector("#collection-name");
// const collectionNameDisplay = document.querySelector("#collection-name-display")

const collectionArray = [];

const Collection = (name) => {
  const collection = {};

  collection.name = name;

  collection.addToArray = function () {
    collectionArray.push(this);
  }

  collection.removeFromArray = function () {
    const collectionToRemove = collectionArray.findIndex((collection) => collection === this);

    if (collectionToRemove !== -1) {
      collectionArray.splice(collectionToRemove, 1);
    }
  }

  return collection;
};


const displayCollectionInNav = (collection) => {
  const collectionDiv = document.createElement('div');
  collectionDiv.classList.add('collection');
  collectionDiv.innerHTML = `${collection.name}`;
  const removeCollectionBtn = document.createElement('button');
  removeCollectionBtn.classList.add('remove-collection-btn');
  removeCollectionBtn.innerHTML = `-`;
  collectionDiv.appendChild(removeCollectionBtn);
  collectionsContainer.append(collectionDiv);

  // collectionNameDisplay.innerHTML = `${collection.name}`;
}


// const displayCollections = () => {
//   collectionArray.forEach(collection => {
//     displayCollection(collection);
//   })
// }

const makeCollection = () => {
  const collectionName = collectionNameInput.value;
  let validName = validateCollectionName(collectionName);

  if (collectionName !== "" && validName) {
    const newCollection = Collection(collectionName);
    newCollection.addToArray();
    displayCollectionInNav(newCollection);
    closeModal();
  } else if (collectionName === "") {
    alert("Collection name cannot be empty!");
  } else if (!validName) {
    alert("That name already exists!");
  }
}

const validateCollectionName = (collectionName) => {
  let valid = true;

  collectionArray.forEach(collection => {
    if (collection.name === collectionName) {
      valid = false;
    }
  })

  return valid;
}

export { makeCollection }
