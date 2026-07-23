import React, { useState, useEffect } from 'react';

const HistorialTransacciones = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [error, setError] = useState('');

  const cargarHistorial = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch('http://localhost:3001/api/transaccion/obtener', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (!response.ok) throw new Error('Error al traer los datos');
      
      const data = await response.json();
      setTransacciones(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  const borrarTransaccion = async (id) => {
    if(!window.confirm('¿Seguro que querés borrar esta transacción?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/transaccion/eliminar/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setTransacciones(transacciones.filter(t => t.id !== id));
      }
    } catch (err) {
      alert('Error al borrar la transacción');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mi Historial de Transacciones</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Monto</th>
            <th className="border p-2">Categoría</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.map((t) => (
            <tr key={t.id}>
              <td className="border p-2">{t.fecha}</td>
              <td className="border p-2">{t.descripcion}</td>
              <td className="border p-2">${t.monto}</td>
              <td className="border p-2">{t.Categorium?.nombre}</td>
              <td className="border p-2">
                <button 
                  onClick={() => borrarTransaccion(t.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialTransacciones;