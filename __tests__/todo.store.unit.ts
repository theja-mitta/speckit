import { loadTodos, saveTodos, TodoItem } from '../src/lib/todoStore';

describe('todoStore', () => {
  beforeEach(() => {
    // ensure clean
    // @ts-ignore
    delete (global as any).localStorage;
  });

  test('returns empty when no storage', () => {
    expect(loadTodos()).toEqual([]);
  });

  test('returns empty on invalid JSON', () => {
    // @ts-ignore
    global.localStorage = { getItem: () => 'not-json' };
    expect(loadTodos()).toEqual([]);
  });

  test('returns empty when parsed value is not array', () => {
    // @ts-ignore
    global.localStorage = { getItem: () => JSON.stringify({ foo: 'bar' }) };
    expect(loadTodos()).toEqual([]);
  });

  test('parses stored array', () => {
    const items = [{ id: '1', title: 'a', completed: false }];
    // @ts-ignore
    global.localStorage = { getItem: () => JSON.stringify(items) };
    const loaded = loadTodos();
    expect(loaded.length).toBe(1);
    expect(loaded[0].id).toBe('1');
    expect(loaded[0].title).toBe('a');
    expect(loaded[0].completed).toBe(false);
  });

  test('saveTodos calls setItem', () => {
    let wrote: string | null = null;
    // @ts-ignore
    global.localStorage = { setItem: (_k: string, v: string) => { wrote = v; } };
    const items: TodoItem[] = [{ id: '2', title: 'b', completed: true }];
    saveTodos(items);
    expect(wrote).not.toBeNull();
    expect(JSON.parse(wrote as string)[0].id).toBe('2');
  });
});
