import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Bienvenido{user ? `, ${user.nombre || user.name || user.email}` : ''}.</p>
      <p className="mt-4 text-sm text-gray-600">Desde acá podés navegar a las páginas del sistema.</p>
      
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <Link to="/transactions/create" className="block p-6 border rounded shadow-sm bg-gray-50 hover:bg-gray-100">
          <h2 className="font-semibold text-lg">Crear transacción</h2>
          <p className="text-sm text-gray-600 mt-2">Registra un nuevo ingreso o egreso.</p>
        </Link>

        <Link to="/transacciones" className="block p-6 border rounded shadow-sm bg-gray-50 hover:bg-gray-100">
          <h2 className="font-semibold text-lg">Historial transacciones</h2>
          <p className="text-sm text-gray-600 mt-2">Ver todas tus transacciones.</p>
        </Link>

        <Link to="/balance" className="block p-6 border rounded shadow-sm bg-gray-50 hover:bg-gray-100">
          <h2 className="font-semibold text-lg">Balance</h2>
          <p className="text-sm text-gray-600 mt-2">Consulta el balance por usuario.</p>
        </Link>

        <Link to="/categorias" className="block p-6 border rounded shadow-sm bg-gray-50 hover:bg-gray-100">
          <h2 className="font-semibold text-lg">Categorías</h2>
          <p className="text-sm text-gray-600 mt-2">Administra categorías de transacciones.</p>
        </Link>

        <Link to="/profile" className="block p-6 border rounded shadow-sm bg-gray-50 hover:bg-gray-100">
          <h2 className="font-semibold text-lg">Ver perfil</h2>
          <p className="text-sm text-gray-600 mt-2">Consulta tus datos y tus transacciones.</p>
        </Link>
        
        <Link to="/register" className="block p-6 border rounded shadow-sm bg-gray-50 hover:bg-gray-100">
          <h2 className="font-semibold text-lg">Registrar otro usuario</h2>
          <p className="text-sm text-gray-600 mt-2">Creá un nuevo usuario desde la aplicación.</p>
        </Link>
      </div>
    </div>
  );
}
