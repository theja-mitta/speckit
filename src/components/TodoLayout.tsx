import React from 'react';

export default function TodoLayout({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-1/2">{left}</div>
        <div className="md:w-1/2">{right}</div>
      </div>
    </div>
  );
}
