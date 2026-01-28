"use client";
import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

export default function TodoApp() {
  const { items, add, toggle, remove, update } = useTodo();
  const [title, setTitle] = useState('');

  return (
    <div className="w-full max-w-xl">
      <div className="mb-4 flex gap-2">
        <input
          aria-label="New todo"
          className="flex-1 rounded border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={() => {
            add(title);
            setTitle('');
          }}
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {items.map((t) => (
          <li key={t.id} className="flex items-center justify-between rounded border p-2">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} />
              <input
                aria-label={`title-${t.id}`}
                className="bg-transparent"
                value={t.title}
                onChange={(e) => update(t.id, e.target.value)}
              />
            </div>
            <button className="text-red-600" onClick={() => remove(t.id)} aria-label={`delete-${t.id}`}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
