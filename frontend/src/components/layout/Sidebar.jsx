import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-56 bg-gray-100 p-4 h-full">
      <ul className="space-y-2">
        <li>
          <Link to="/dashboard" className="text-gray-700">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile" className="text-gray-700">Perfil</Link>
        </li>
        <li>
          <Link to="/register" className="text-gray-700">Registrar usuario</Link>
        </li>
      </ul>
    </aside>
  );
}
