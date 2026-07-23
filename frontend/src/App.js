import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HistorialTransacciones from './pages/HistorialTransacciones';

const Inicio = () => (
  <div className="App" style={{ backgroundColor: '#282c34', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
    <h1>¡Bienvenido a tu nueva aplicación!</h1>
    <p>Frontend React funcionando correctamente</p>
    <div style={{ marginTop: '30px' }}>
      <Link 
        to="/historial" 
        style={{ 
          backgroundColor: '#61dafb', 
          color: '#282c34', 
          padding: '12px 24px', 
          borderRadius: '5px', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          fontSize: '18px'
        }}
      >
        Mi Historial de Transacciones
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/historial" element={<HistorialTransacciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;