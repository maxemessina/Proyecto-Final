import React, { useState } from 'react';
import './App.css';
import Balance from './pages/balance';

function App() {
  // Estado para controlar en qué sección/vista estamos ('inicio' o 'balance')
  const [vistaActual, setVistaActual] = useState('inicio');

  return (
    <div className="App">
      {/* Barra de navegación superior */}
      <nav className="bg-slate-900 border-b border-slate-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-white font-bold text-lg">Control de Gastos</span>
          
          <div className="flex gap-3">
            <button
              onClick={() => setVistaActual('inicio')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                vistaActual === 'inicio'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setVistaActual('balance')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                vistaActual === 'balance'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Ver Balance
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido Dinámico según el estado */}
      <main className="p-4">
        {vistaActual === 'inicio' ? (
          <header className="App-header my-12 text-center">
            <h1 className="text-3xl font-bold text-white mb-3">
              ¡Bienvenido a tu nueva aplicación!
            </h1>
            <p className="text-slate-400 mb-6">
              Frontend React funcionando correctamente
            </p>
            
            {/* Botón destacado para ir a la sección de Balance */}
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => setVistaActual('balance')}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                📊 Ir al Consultor de Balance
              </button>

              <p className="text-xs text-slate-500">
                <a 
                  href="/api/health" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-slate-400"
                >
                  Verificar estado de la API
                </a>
              </p>
            </div>
          </header>
        ) : (
          /* Apartado del Balance con botón para regresar */
          <div className="max-w-4xl mx-auto">
            <Balance />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;