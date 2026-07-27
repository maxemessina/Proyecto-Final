import React, { useState, useEffect } from 'react';

const HistorialTransacciones = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [error, setError] = useState('');
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({ monto: '', descripcion: '', fecha: '' });
  const [categoriaId, setCategoriaId] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

const cargarHistorial = async () => {
  try {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if (categoriaId) params.append("categoria_id", categoriaId);
    if (fechaDesde) params.append("fechaDesde", fechaDesde);
    if (fechaHasta) params.append("fechaHasta", fechaHasta);

    const response = await fetch(
  `http://localhost:3001/api/transaccion/filtrar?${params.toString()}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
);

    if (!response.ok) {
      throw new Error("Error al traer las transacciones");
    }

    const data = await response.json();
    setTransacciones(data);
    setPaginaActual(1);
  } catch (err) {
    setError(err.message);
  }
};


  useEffect(() => {
    cargarHistorial();
  }, []);

  const indiceUltimoRegistro = paginaActual * registrosPorPagina;
const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;

const transaccionesPaginadas = transacciones.slice(
  indicePrimerRegistro,
  indiceUltimoRegistro
);

const totalPaginas = Math.ceil(
  transacciones.length / registrosPorPagina
);

  const borrarTransaccion = async (id) => {
    if (!window.confirm('¿Estás seguro de que querés eliminar esta transacción?')) return;
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
      } else {
        alert('No se pudo eliminar la transacción');
      }
    } catch (err) {
      alert('Error de red al borrar la transacción');
    }
  };

  // Abrir modal de edición con los datos actuales
  const abrirModalEditar = (t) => {
    setEditando(t.id);
    setFormData({
      monto: t.monto,
      descripcion: t.descripcion,
      fecha: t.fecha ? t.fecha.split('T')[0] : ''
    });
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/transaccion/actualizar/${editando}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setEditando(null);
        cargarHistorial();
      } else {
        alert('Error al actualizar la transacción');
      }
    } catch (err) {
      alert('Error de red al actualizar');
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-6 md:p-8 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Mi Historial y Gestión
        </h2>
        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-semibold rounded-full border border-indigo-500/20">
          {transacciones.length} registros
        </span>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

  <input
    type="number"
    placeholder="Categoría"
    value={categoriaId}
    onChange={(e) => setCategoriaId(e.target.value)}
    className="bg-slate-700 text-white rounded-lg px-3 py-2"
  />

  <input
    type="date"
    value={fechaDesde}
    onChange={(e) => setFechaDesde(e.target.value)}
    className="bg-slate-700 text-white rounded-lg px-3 py-2"
  />

  <input
    type="date"
    value={fechaHasta}
    onChange={(e) => setFechaHasta(e.target.value)}
    className="bg-slate-700 text-white rounded-lg px-3 py-2"
  />
</div>

<button
  onClick={cargarHistorial}
  className="mb-6 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg"
>
  Filtrar
</button>

      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 text-slate-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Fecha</th>
              <th className="p-4 font-semibold">Descripción</th>
              <th className="p-4 font-semibold">Categoría</th>
              <th className="p-4 font-semibold">Monto</th>
              <th className="p-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 bg-slate-800">
            {transaccionesPaginadas.map((t) => (
              <tr key={t.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="p-4 text-slate-300">
                  {new Date(t.fecha).toLocaleDateString('es-AR')}
                </td>
                <td className="p-4 text-slate-200 font-medium">{t.descripcion}</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-300 border border-slate-600">
                    {t.Categorium?.nombre || 'General'}
                  </span>
                </td>
                <td className="p-4 text-emerald-400 font-bold">
                  ${parseFloat(t.monto).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </td>
                <td className="p-4 text-center flex justify-center gap-2">
                  <button 
                    onClick={() => abrirModalEditar(t)}
                    className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-indigo-500/20"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => borrarTransaccion(t.id)}
                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-rose-500/20"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
                {transacciones.length === 0 && !error && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-slate-500">
                  No hay transacciones registradas aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
  <button
    onClick={() => setPaginaActual(paginaActual - 1)}
    disabled={paginaActual === 1}
    className="px-4 py-2 bg-slate-700 text-white rounded disabled:opacity-50"
  >
    Anterior
  </button>

  <span className="text-white">
    Página {paginaActual} de {totalPaginas || 1}
  </span>

  <button
    onClick={() => setPaginaActual(paginaActual + 1)}
    disabled={paginaActual === totalPaginas || totalPaginas === 0}
    className="px-4 py-2 bg-slate-700 text-white rounded disabled:opacity-50"
  >
    Siguiente
  </button>
</div>


      {editando && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Editar Transacción</h3>
            
            <form onSubmit={guardarEdicion} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Descripción</label>
                <input 
                  type="text" 
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Monto ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={formData.monto}
                  onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Fecha</label>
                <input 
                  type="date" 
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  required 
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setEditando(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-600/30"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialTransacciones;