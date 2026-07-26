import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <div className="font-bold">Mi App</div>
        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link to="/dashboard" className="text-gray-200 hover:text-white">Dashboard</Link>
          <Link to="/balance" className="text-gray-200 hover:text-white">Balance</Link>
          <Link to="/categorias" className="text-gray-200 hover:text-white">Categorías</Link>
          <Link to="/transactions/create" className="text-gray-200 hover:text-white">Crear transacción</Link>
          <Link to="/transacciones" className="text-gray-200 hover:text-white">Historial</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user ? <span className="hidden sm:inline">Hola, {user.nombre || user.name || user.email}</span> : null}
        <Link to="/profile" className="text-gray-200 hover:text-white hidden sm:inline">Perfil</Link>
        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Cerrar sesión</button>
      </div>
    </nav>
  );
}
