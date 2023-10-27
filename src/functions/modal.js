const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalHeader = document.querySelector(".modal-header");
const modalTodoFormContainer = document.querySelector(".modal-todo-form-container");
const modalCollectionFormContainer = document.querySelector(".modal-collection-form-container");
const modalInputs = modal.querySelectorAll("input, select, textarea");
const modalAddBtn = document.querySelector("#modal-add-btn");

const toggleReadOnly = () => {
  modalInputs.forEach(input => {
    if (!input.readOnly) {
      input.readOnly = true;
    }

    if (input.tagName === 'SELECT' && !input.disabled) {
      input.disabled = true;
    }
  })
}

const clearInputs = () => {
  modalInputs.forEach(input => {
    input.value = ``;

    if (input.readOnly) {
      input.readOnly = false;;
    }

    if (input.tagName === 'SELECT' && input.disabled) {
      input.disabled = false;
    }
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

const editModalDisplay = (modalItemName) => {
  if (modalItemName === "Todo") {
    displayTodoForm();
    modalHeader.innerHTML = `Add a new Todo:`;
    modalAddBtn.innerHTML = `Add`;
  } else if (modalItemName === "Collection") {
    displayCollectionForm();
    modalHeader.innerHTML = `Add a new Collection:`;
    modalAddBtn.innerHTML = `Add`;
  } else if (modalItemName === "Edit") {
    displayTodoForm();
    modalHeader.innerHTML = `Edit Todo:`;
    modalAddBtn.innerHTML = `Edit`;
  } else if (modalItemName === `View`) {
    modalHeader.innerHTML = `View Todo:`;
    modalAddBtn.classList.add('hidden');
    displayTodoForm();
  }
}

const openModal = (modalItemName) => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');

  editModalDisplay(modalItemName);
}

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');

  if (modalAddBtn.classList.contains('hidden')) {
    modalAddBtn.classList.remove('hidden');
  }

  clearInputs();
}


export { openModal, closeModal, toggleReadOnly }
