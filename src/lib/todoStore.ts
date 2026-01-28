import type { TodoItem } from "../types/todo";
export type { TodoItem } from "../types/todo";

const STORAGE_KEY = "speckit:todos";

export function loadTodos(): TodoItem[] {
  try {
    const raw = (globalThis as any).localStorage?.getItem(STORAGE_KEY) ?? null;
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((p: any) => ({
      id: String(p.id),
      title: String(p.title),
      completed: !!p.completed,
      order: typeof p.order === "number" ? p.order : undefined,
      createdAt: p.createdAt,
    }));
  } catch (e) {
    return [];
  }
}

export function saveTodos(items: TodoItem[]) {
  try {
    (globalThis as any).localStorage?.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    // noop
  }
}
