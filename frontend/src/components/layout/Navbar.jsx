import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="font-bold">Mi App</div>
      <div className="flex items-center gap-4">
        {user ? <span>Hola, {user.name || user.email}</span> : null}
        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Cerrar sesión</button>
      </div>
    </nav>
  );
}
