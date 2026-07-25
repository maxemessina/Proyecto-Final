import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HistorialTransacciones from './pages/HistorialTransacciones';
import Balance from './pages/balance';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 font-sans">
        {/* Barra de navegación superior unificada */}
        <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <span className="text-white font-bold text-xl tracking-tight">Control de Gastos</span>
            
            <div className="flex gap-3">
              <Link to="/" className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all">
                Inicio
              </Link>
              <Link to="/historial" className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all">
                Mi Historial
              </Link>
              <Link to="/balance" className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all">
                Ver Balance
              </Link>
            </div>
          </div>
        </nav>

        {/* Contenedor principal de vistas */}
        <main className="p-4">
          <Routes>
            <Route path="/" element={
              <header className="my-12 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-4">
                  ¡Bienvenido a tu nueva aplicación!
                </h1>
                <p className="text-slate-400 mb-8 text-lg">
                  Frontend React funcionando correctamente y unificado.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Link to="/historial" className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all">
                    Ver Transacciones
                  </Link>
                  <Link to="/balance" className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/30 transition-all">
                    Consultar Balance
                  </Link>
                </div>
              </header>
            } />
            
            <Route path="/historial" element={
              <div className="max-w-4xl mx-auto mt-4">
                <HistorialTransacciones />
              </div>
            } />
            
            <Route path="/balance" element={
              <div className="max-w-4xl mx-auto mt-4">
                <Balance />
              </div>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;