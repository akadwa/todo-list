const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalHeader = document.querySelector(".modal-header");
const modalTodoFormContainer = document.querySelector(".modal-todo-form-container");
const modalCollectionFormContainer = document.querySelector(".modal-collection-form-container");
const modalInputs = modal.querySelectorAll("input, select, textarea");

const clearInputs = () => {
  modalInputs.forEach(input => {
    input.value = ``;
  })
}

const displayTodoForm = () => {
  modalTodoFormContainer.classList.remove('hidden');
  modalCollectionFormContainer.classList.add('hidden');
}

const displayCollectionForm = () => {
  modalTodoFormContainer.classList.add('hidden');
  modalCollectionFormContainer.classList.remove('hidden');
}

const openModal = (modalItemName) => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  modalHeader.innerHTML = `Add a new ${modalItemName}:`;

  if (modalItemName === "Todo") {
    displayTodoForm();
  } else if (modalItemName === "Collection") {
    displayCollectionForm();
  }
}

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');

  clearInputs();
}


export { openModal, closeModal }
