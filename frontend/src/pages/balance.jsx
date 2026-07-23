import React, { useState } from 'react';
import { 
  Wallet, 
  User, 
  Search, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Scale, 
  BarChart3, 
  Loader2 
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:3001/api/transaccion/balance';

export default function Balance() {
  const [usuarioId, setUsuarioId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Formateador de moneda en pesos argentinos (ARS)
  const formatearMoneda = (cantidad) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(cantidad || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuarioId.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`${API_BASE_URL}/${usuarioId}`);
      const result = await response.json();

      if (!response.ok || result.status !== 'success') {
        throw new Error(result.message || 'Error al obtener el balance');
      }

      setData(result.data);
    } catch (err) {
      setError(err.message || 'No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  // Helper para definir estilos según si el balance es positivo, negativo o cero
  const getNetoStyles = (neto) => {
    if (neto > 0) {
      return {
        card: 'p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5',
        text: 'text-3xl font-extrabold text-emerald-400',
        badge: 'text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
        icon: 'p-2 bg-emerald-500/10 text-emerald-400 rounded-lg',
        label: 'Superávit'
      };
    }
    if (neto < 0) {
      return {
        card: 'p-6 rounded-xl border border-rose-500/30 bg-rose-500/5',
        text: 'text-3xl font-extrabold text-rose-400',
        badge: 'text-xs font-semibold px-2.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400',
        icon: 'p-2 bg-rose-500/10 text-rose-400 rounded-lg',
        label: 'Déficit'
      };
    }
    return {
      card: 'p-6 rounded-xl border border-slate-700 bg-slate-900/90',
      text: 'text-3xl font-extrabold text-slate-200',
      badge: 'text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-700 bg-slate-800 text-slate-400',
      icon: 'p-2 bg-slate-800 text-slate-400 rounded-lg',
      label: 'Neutro'
    };
  };

  const netoStyle = data ? getNetoStyles(data.balanceNeto) : null;

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 pb-5 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Wallet className="text-indigo-400" />
              Resumen de Balance
            </h1>
            <p className="text-slate-400 text-sm mt-1">Consulta el estado financiero por ID de usuario</p>
          </div>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-semibold rounded-full border border-indigo-500/20">
            En tiempo real
          </span>
        </div>

        {/* Formulario / Selector de Usuario */}
        <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-5 h-5" />
            </div>
            <input
              type="number"
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.value)}
              placeholder="Ingrese el ID del Usuario (ej: 1)"
              required
              min="1"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-100 placeholder-slate-500 transition-all outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Consultar</span>
          </button>
        </form>

        {/* Estado de Carga */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin h-10 w-10 text-indigo-500" />
            <p className="text-slate-400 text-sm mt-3">Calculando balance...</p>
          </div>
        )}

        {/* Alerta de Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Panel de Resultados */}
        {!loading && data && (
          <div className="space-y-4">
            
            {/* Grid de Ingresos y Egresos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card Ingresos */}
              <div className="bg-slate-900/60 p-5 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm font-medium">Total Ingresos</span>
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-emerald-400">
                  {formatearMoneda(data.ingresos)}
                </p>
              </div>

              {/* Card Egresos */}
              <div className="bg-slate-900/60 p-5 rounded-xl border border-rose-500/20 hover:border-rose-500/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm font-medium">Total Egresos</span>
                  <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                    <ArrowDownLeft className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-rose-400">
                  {formatearMoneda(data.egresos)}
                </p>
              </div>

            </div>

            {/* Card Balance Neto */}
            <div className={netoStyle.card}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-300 text-sm font-medium uppercase tracking-wider">Balance Neto</span>
                <div className={netoStyle.icon}>
                  <Scale className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <p className={netoStyle.text}>
                  {formatearMoneda(data.balanceNeto)}
                </p>
                <span className={netoStyle.badge}>
                  {netoStyle.label}
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Estado Inicial Vacío */}
        {!loading && !data && !error && (
          <div className="text-center py-12 text-slate-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">Ingresa un ID de usuario arriba para visualizar su balance.</p>
          </div>
        )}

      </div>
    </div>
  );
}