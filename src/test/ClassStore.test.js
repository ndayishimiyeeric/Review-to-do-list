import {
  addTask, deleteItem, tasksArray, clearAllFunction,
  CompletedTask, updateTask,
} from '../modules/ClassStore.js';

describe('Add and Delete Function', () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };
  global.localStorage = localStorageMock;
  test('add item to array', () => {
    addTask('Play');
    expect(tasksArray).toEqual([{ description: 'Play', index: 1, complete: false }]);
    expect(tasksArray.length).toBe(1);
    expect(global.localStorage.setItem).toBeCalledWith('tasks', JSON.stringify(tasksArray));
  });

  test('remove item from array', () => {
    const array = [];
    deleteItem(array, 1);
    expect(array).toEqual([]);
    expect(array.length).toBe(0);
    expect(global.localStorage.setItem).toBeCalledWith('tasks', JSON.stringify(tasksArray));
  });
});

describe('delete completed tasks, Update a task to completed, and edit a task description', () => {
  test('delete completed tasks', () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;
    global.localStorage.setItem('tasks', JSON.stringify([
      { description: 'play', index: 1, complete: false },
      { description: 'eat', index: 2, complete: true },
    ]));
    clearAllFunction();
    expect(global.localStorage.setItem).toBeCalledWith(
      'tasks',
      JSON.stringify(tasksArray),
    );
  });

  test('Update a task to completed', () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;
    const array = [
      { description: 'Play', completed: true, index: 1 },
      { description: 'eat', completed: false, index: 2 },
    ];
    CompletedTask(array, 2);
    expect(global.localStorage.setItem).toBeCalledWith(
      'tasks',
      JSON.stringify([
        { description: 'Play', completed: true, index: 1 },
        { description: 'eat', completed: true, index: 2 },
      ]),
    );
  });
  test('Edit a task description', () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;
    updateTask(1, 'eat');
    expect(tasksArray).toEqual([{ description: 'eat', index: 1, complete: false }]);
    expect(global.localStorage.setItem).toBeCalledWith('tasks', JSON.stringify(tasksArray));
  });
});