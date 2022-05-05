import { addTask, deleteItem, tasksArray } from '../modules/ClassStore.js';

describe('Add and Delete Function', () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };
  global.localStorage = localStorageMock;
  test('add item to array', () => {
    addTask('Play');
    const expected = {
      description: 'Play',
      index: 1,
      complete: false,
    };
    expect(tasksArray).toEqual([expected]);
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
