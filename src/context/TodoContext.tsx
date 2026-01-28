"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { TodoItem, loadTodos, saveTodos } from "../lib/todoStore";

type TodoContextValue = {
  items: TodoItem[];
  add: (title: string) => void;
  update: (id: string, title: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
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
    const item: TodoItem = { id: Date.now().toString(), title: title.trim(), completed: false };
    setItems((s) => [item, ...s]);
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

  return (
    <TodoContext.Provider value={{ items, add, update, toggle, remove }}>{children}</TodoContext.Provider>
  );
}

export function useTodo() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo must be used within TodoProvider");
  return ctx;
}
