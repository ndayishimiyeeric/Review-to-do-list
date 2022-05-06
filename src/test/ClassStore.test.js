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
