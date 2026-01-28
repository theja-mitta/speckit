import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { TodoProvider, useTodo } from '../src/context/TodoContext';

function wrapper({ children }) {
  return React.createElement(TodoProvider, null, children);
}

describe('TodoContext', () => {
  beforeEach(() => {
    // @ts-ignore
    global.localStorage = {
      store: {},
      getItem(key) { return this.store[key] ?? null },
      setItem(key, value) { this.store[key] = value }
    };
  });

  test('add, toggle, update, remove', () => {
    const { result } = renderHook(() => useTodo(), { wrapper });

    act(() => result.current.add('First'));
    expect(result.current.items.length).toBe(1);
    const id = result.current.items[0].id;

    act(() => result.current.toggle(id));
    expect(result.current.items[0].completed).toBe(true);

    act(() => result.current.update(id, 'Renamed'));
    expect(result.current.items[0].title).toBe('Renamed');

    act(() => result.current.remove(id));
    expect(result.current.items.length).toBe(0);
  });
  
  test('useTodo throws outside provider', () => {
    // calling hook outside provider should throw
    expect(() => {
      // renderHook without provider to trigger the throw
      const { result } = require('@testing-library/react').renderHook(() => require('../src/context/TodoContext').useTodo());
    }).toThrow();
  });

  test('add ignores empty title', () => {
    const { result } = require('@testing-library/react').renderHook(() => require('../src/context/TodoContext').useTodo(), { wrapper: ({ children }) => React.createElement(require('../src/context/TodoContext').TodoProvider, null, children) });
    require('@testing-library/react').act(() => result.current.add('   '));
    expect(result.current.items.length).toBe(0);
  });
});
