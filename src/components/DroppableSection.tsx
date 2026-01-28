import React from 'react';

export default function DroppableSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex-1">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <div className="rounded border bg-white p-3">{children}</div>
    </section>
  );
}
