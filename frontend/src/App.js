import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Categorias from './pages/Categorias';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import CrearTransaccion from './pages/CrearTransaccion';
import HistorialTransacciones from './pages/HistorialTransacciones';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      {/* Ruta para crear transacción */}
    <Route
      path="/transactions/create"
      element={
      <ProtectedRoute>
        <MainLayout>
        <CrearTransaccion />
        </MainLayout>
      </ProtectedRoute>
    }
/>
      <Route
  path="/transacciones"
  element={
    <ProtectedRoute>
      <MainLayout>
        <HistorialTransacciones />
      </MainLayout>
    </ProtectedRoute>
  }
/>

      <Route
        path="/categorias"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Categorias />
            </MainLayout>
          </ProtectedRoute>
        }
      />  

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}