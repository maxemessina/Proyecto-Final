import React from 'react';
import Navbar from './Navbar';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="p-6 flex-1 bg-white">{children}</main>
    </div>
  );
}
