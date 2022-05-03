import './styles/main.scss';
import Tasks from './modules/ClassStore.js';
import {
  addForm, reset, clearAll,
} from './modules/selectors.js';

const tasksCollection = new Tasks();
tasksCollection.displayTasks();

const setLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasksCollection.tasksArray));
};

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputTaskValue = document.querySelector('#input-add-task').value;
  if (inputTaskValue === null || inputTaskValue === '') return;
  tasksCollection.addTask(inputTaskValue);
  document.querySelector('#input-add-task').value = '';
});

reset.addEventListener('click', () => {
  tasksCollection.tasksArray = [];
  setLocalStorage();
  tasksCollection.displayTasks();
});

clearAll.addEventListener('click', () => {
  tasksCollection.tasksArray = tasksCollection.tasksArray.filter((task) => !task.complete);
  setLocalStorage();
  tasksCollection.displayTasks();
});
