import { addTask, deleteItem, tasksArray } from '../modules/ClassStore.js';

describe('Add and Delete Function', () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };
  global.localStorage = localStorageMock;
});