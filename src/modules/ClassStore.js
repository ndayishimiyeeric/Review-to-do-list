import { taskDiv } from './selectors.js';

export let tasksArray = []; //eslint-disable-line

// export default class Tasks {
export function displayTasks() {
  if (localStorage.getItem('tasks')) {
    tasksArray = JSON.parse(localStorage.getItem('tasks'));
  }
  taskDiv.innerHTML = '';
  tasksArray.sort((taskOne, taskTwo) => taskOne.index - taskTwo.index).forEach((task) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskDiv.appendChild(taskElement);
    taskElement.innerHTML = `
        <input class="checkbox" type="checkbox" id="${task.index}" />
        <textarea class="textarea" for="${task.index}">${task.description}</textarea>
        <span class="delete" id="${task.index}"><i class="fa-solid fa-trash-can"></i></span>
       `;
  });

  const deleteBtn = document.querySelectorAll('.delete');
  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.id);
      deleteItem(tasksArray, id); //eslint-disable-line
      // document.location.reload();
    });
  });
  const textareaEvent = document.querySelectorAll('.textarea');
  textareaEvent.forEach((event) => {
    event.addEventListener('focusout', (e) => {
      e.target.parentElement.style.background = '#fff';
      if (e.target.value) {
        updateTask(e.target.parentElement.firstElementChild.id, e.target.value); //eslint-disable-line
      }
      if (e.target.previousElementSibling.checked) {
        e.target.style.textDecoration = 'line-through';
      }
    });
    event.addEventListener('focusin', (e) => {
      e.target.parentElement.style.background = '#E9E4F0';
      e.target.style.background = 'transparent';
      e.target.style.textDecoration = 'none';
    });
  });

  const checkboxInputs = document.querySelectorAll('input[type=checkbox]');
  checkboxInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
        for (let task of tasksArray) {//eslint-disable-line
        if (task.index == e.target.id) { //eslint-disable-line
          if (e.target.checked) {
            task.complete = true;
            e.target.nextElementSibling.style.textDecoration = 'line-through';
          } else {
            task.complete = false;
            e.target.nextElementSibling.style.textDecoration = 'none';
          }
        }
      }
      localStorage.setItem('tasks', JSON.stringify(tasksArray));
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const checkedBoxs = document.querySelectorAll('.checkbox');
    checkedBoxs.forEach((checkedBox) => {
        for (let task of tasksArray) {//eslint-disable-line
        if (checkedBox.id == task.index) { //eslint-disable-line
          if (task.complete) {
            checkedBox.checked = true;
          } else {
            checkedBox.checked = false;
          }
        }
      }
    });
  });
}

  export function addTask(description) { //eslint-disable-line
  if (localStorage.getItem('tasks')) {
    tasksArray = JSON.parse(localStorage.getItem('tasks'));
  }
  const task = {
    description,
    index: tasksArray.length + 1,
    complete: false,
  };
  tasksArray.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
  // displayTasks();
  // document.location.reload();
}

  export function removeTask(index) { //eslint-disable-line
  if (localStorage.getItem('tasks')) {
    tasksArray = JSON.parse(localStorage.getItem('tasks'));
  }
  tasksArray.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
  displayTasks();
}

  function updateTask(index, newdescription) {//eslint-disable-line
  if (localStorage.getItem('tasks')) {
    tasksArray = JSON.parse(localStorage.getItem('tasks'));
  }
    for (let task of tasksArray) {//eslint-disable-line
    if (task.index === index) {
      task.description = newdescription;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}
// }

const RefactorIndex = (tasks) => {
  tasks.forEach((item, i) => {
    item.index = i + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export function deleteItem(tasksArray, id) {
  tasksArray = tasksArray.filter((item) => {
    if (id !== item.index) {
      return true;
    }
    return false;
  });
  RefactorIndex(tasksArray);
  // displayTasks();
}