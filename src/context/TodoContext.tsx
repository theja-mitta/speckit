"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { loadTodos, saveTodos } from "../lib/todoStore";
import type { TodoItem } from "../types/todo";

type TodoContextValue = {
  items: TodoItem[];
  add: (title: string) => void;
  update: (id: string, title: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  move: (id: string, toSection: "active" | "completed", toIndex: number) => void;
};

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    setItems(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(items);
  }, [items]);

  const add = (title: string) => {
    if (!title.trim()) return;
    setItems((s) => {
      const maxOrder = s.reduce((m, it) => Math.max(m, it.order ?? 0), 0);
      const item: TodoItem = { id: Date.now().toString(), title: title.trim(), completed: false, order: maxOrder + 1, createdAt: new Date().toISOString() };
      return [item, ...s];
    });
  };

  const update = (id: string, title: string) => {
    setItems((s) => s.map((t) => (t.id === id ? { ...t, title } : t)));
  };

  const toggle = (id: string) => {
    setItems((s) => s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const remove = (id: string) => {
    setItems((s) => s.filter((t) => t.id !== id));
  };

  const move = (id: string, toSection: "active" | "completed", toIndex: number) => {
    setItems((s) => {
      const item = s.find((x) => x.id === id);
      if (!item) return s;

      // remove item
      const remaining = s.filter((x) => x.id !== id);

      // split into sections
      const active = remaining.filter((x) => !x.completed);
      const completed = remaining.filter((x) => x.completed);

      // determine destination list reference
      const destList = toSection === "active" ? active : completed;

      // insert at index
      const newDest = [...destList.slice(0, toIndex), { ...item, completed: toSection === "completed" }, ...destList.slice(toIndex)];

      // recompute orders: higher order -> appears first
      const assignOrders = (arr: TodoItem[]) => arr.map((it, idx) => ({ ...it, order: arr.length - idx }));

      const newActive = toSection === "active" ? assignOrders(newDest) : assignOrders(active);
      const newCompleted = toSection === "completed" ? assignOrders(newDest) : assignOrders(completed);

      return [...newActive, ...newCompleted];
    });
  };

  return (
    <TodoContext.Provider value={{ items, add, update, toggle, remove, move }}>{children}</TodoContext.Provider>
  );
}

export function useTodo() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo must be used within TodoProvider");
  return ctx;
}
