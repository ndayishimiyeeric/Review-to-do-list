import './styles/main.scss';
// import Tasks, { tasksArray } from './modules/ClassStore.js';
// import { tasksArray } from './modules/ClassStore.js';
import {
  addForm, reset, clearAll,
} from './modules/selectors.js';

import {
  displayTasks, addTask, tasksArray,
} from './modules/ClassStore.js';

// const tasksCollection = new Tasks();
// tasksCollection.displayTasks();
displayTasks();

const setLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
};

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputTaskValue = document.querySelector('#input-add-task').value;
  if (inputTaskValue === null || inputTaskValue === '') return;
  // tasksCollection.addTask(inputTaskValue);
  addTask(inputTaskValue);
  document.querySelector('#input-add-task').value = '';
});

reset.addEventListener('click', () => {
  tasksArray = [];
  setLocalStorage();
  // tasksCollection.displayTasks();
  displayTasks();
});

function clearAllFunction() {
  const newtasksArray = tasksArray.filter((task) => !task.complete);
  localStorage.setItem('tasks', JSON.stringify(newtasksArray));
  // tasksCollection.displayTasks();
  displayTasks();
  document.location.reload();
}

clearAll.addEventListener('click', clearAllFunction);

export default { clearAllFunction };