import React, { useRef } from 'react';
import type { TodoItem } from '../types/todo';

export default function DraggableList({
  items,
  renderItem,
  onMove,
}: {
  items: TodoItem[];
  renderItem: (item: TodoItem) => React.ReactNode;
  onMove?: (id: string, toIndex: number) => void;
}) {
  const dragIndex = useRef<number | null>(null);

  return (
    <ul className="space-y-2">
      {items.map((it, idx) => (
        <li
          key={it.id}
          draggable
          onDragStart={(e) => {
            dragIndex.current = idx;
            e.dataTransfer?.setData('text/plain', it.id);
            e.dataTransfer?.setData('application/id', it.id);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            const draggedId = e.dataTransfer?.getData('application/id') || e.dataTransfer?.getData('text/plain');
            if (!draggedId) return;
            const from = dragIndex.current ?? items.findIndex((x) => x.id === draggedId);
            const to = idx;
            if (from !== -1 && onMove) onMove(draggedId, to);
            dragIndex.current = null;
          }}
          className=""
        >
          {renderItem(it)}
        </li>
      ))}
    </ul>
  );
}
