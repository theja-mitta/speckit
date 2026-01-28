"use client";
import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import TodoLayout from './TodoLayout';
import DroppableSection from './DroppableSection';
import DraggableList from './DraggableList';

export default function TodoApp() {
  const { items, add, toggle, remove, update, move } = useTodo();
  const [title, setTitle] = useState('');

  const sorted = [...items].sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
  const active = sorted.filter((t) => !t.completed);
  const completed = sorted.filter((t) => t.completed);

  // HTML5 drag-and-drop handled by DraggableList onMove callback

  const left = (
    <DroppableSection title={`Active (${active.length})`}>
      <DraggableList
        items={active}
        renderItem={(t) => (
          <div className="flex items-center justify-between rounded border p-2">
            <div className="flex items-center gap-3">
              <span className="cursor-grab text-gray-400">≡</span>
              <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} />
              <input aria-label={`title-${t.id}`} className="bg-transparent" value={t.title} onChange={(e) => update(t.id, e.target.value)} />
            </div>
            <button className="text-red-600" onClick={() => remove(t.id)} aria-label={`delete-${t.id}`}>
              Delete
            </button>
          </div>
        )}
      />
    </DroppableSection>
  );

  const right = (
    <DroppableSection title={`Completed (${completed.length})`}>
      <DraggableList
        items={completed}
        renderItem={(t) => (
          <div className="flex items-center justify-between rounded border p-2 opacity-70">
            <div className="flex items-center gap-3">
              <span className="cursor-grab text-gray-400">≡</span>
              <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} />
              <input aria-label={`title-${t.id}`} className="bg-transparent line-through" value={t.title} onChange={(e) => update(t.id, e.target.value)} />
            </div>
            <button className="text-red-600" onClick={() => remove(t.id)} aria-label={`delete-${t.id}`}>
              Delete
            </button>
          </div>
        )}
      />
    </DroppableSection>
  );

  return (
    <div className="w-full">
      <div className="mb-4 flex gap-2 max-w-4xl">
        <input aria-label="New todo" className="flex-1 rounded border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={() => { add(title); setTitle(''); }}>
          Add
        </button>
      </div>

      <TodoLayout
        left={
          <DroppableSection title={`Active (${active.length})`}>
            <DraggableList
              items={active}
              renderItem={(t) => (
                <div className="flex items-center justify-between rounded border p-2">
                  <div className="flex items-center gap-3">
                    <span className="cursor-grab text-gray-400">≡</span>
                    <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} />
                    <input aria-label={`title-${t.id}`} className="bg-transparent" value={t.title} onChange={(e) => update(t.id, e.target.value)} />
                  </div>
                  <button className="text-red-600" onClick={() => remove(t.id)} aria-label={`delete-${t.id}`}>
                    Delete
                  </button>
                </div>
              )}
              onMove={(id, to) => move(id, 'active', to)}
            />
          </DroppableSection>
        }
        right={
          <DroppableSection title={`Completed (${completed.length})`}>
            <DraggableList
              items={completed}
              renderItem={(t) => (
                <div className="flex items-center justify-between rounded border p-2 opacity-70">
                  <div className="flex items-center gap-3">
                    <span className="cursor-grab text-gray-400">≡</span>
                    <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} />
                    <input aria-label={`title-${t.id}`} className="bg-transparent line-through" value={t.title} onChange={(e) => update(t.id, e.target.value)} />
                  </div>
                  <button className="text-red-600" onClick={() => remove(t.id)} aria-label={`delete-${t.id}`}>
                    Delete
                  </button>
                </div>
              )}
              onMove={(id, to) => move(id, 'completed', to)}
            />
          </DroppableSection>
        }
      />
    </div>
  );
}
