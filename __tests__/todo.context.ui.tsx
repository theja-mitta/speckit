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
  
  test('add assigns incremental order', () => {
    const { result } = renderHook(() => useTodo(), { wrapper });
    act(() => result.current.add('First'));
    act(() => result.current.add('Second'));
    expect(result.current.items.length).toBe(2);
    expect(result.current.items[0].order).toBeGreaterThan(result.current.items[1].order);
  });

  test('move reorders within active and to completed', () => {
    const { result } = renderHook(() => useTodo(), { wrapper });
    act(() => result.current.add('One'));
    act(() => result.current.add('Two'));
    act(() => result.current.add('Three'));
    // initial order: Three, Two, One
    expect(result.current.items.filter(i => !i.completed).length).toBeGreaterThanOrEqual(3);
    const ids = result.current.items.filter(i => !i.completed).map(i => i.id);
    const first = ids[0];
    // move first to end of active
    act(() => result.current.move(first, 'active', 2));
    const newActive = result.current.items.filter(i => !i.completed);
    expect(newActive[newActive.length - 1].id).toBe(first);

    // move that item to completed at index 0
    act(() => result.current.move(first, 'completed', 0));
    const completed = result.current.items.filter(i => i.completed);
    expect(completed[0].id).toBe(first);
  });
  
  test('useTodo throws outside provider', () => {
    // calling hook outside provider should throw
    expect(() => {
      // renderHook without provider to trigger the throw
      const { result } = require('@testing-library/react').renderHook(() => require('../src/context/TodoContext').useTodo());
    }).toThrow();
  });

  test('add ignores empty title', () => {
    // ensure storage is empty for this isolated scenario before mounting provider
    // @ts-ignore
    global.localStorage.store = {};
    const { result } = require('@testing-library/react').renderHook(() => require('../src/context/TodoContext').useTodo(), { wrapper: ({ children }) => React.createElement(require('../src/context/TodoContext').TodoProvider, null, children) });
    const before = result.current.items.length;
    require('@testing-library/react').act(() => result.current.add('   '));
    expect(result.current.items.length).toBe(before);
  });
});
