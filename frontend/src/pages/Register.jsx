import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await register({ nombre, email, password });
      setSuccess('Usuario creado correctamente. Ya podés entrar al sistema.');
      setTimeout(() => navigate('/dashboard', { replace: true }), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data?.error || 'No se pudo crear el usuario');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>
      {error && <div className="mb-3 text-red-600">{error}</div>}
      {success && <div className="mb-3 text-green-600">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm">Nombre</span>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border p-2 rounded" required />
        </label>
        <label className="block">
          <span className="text-sm">Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        </label>
        <label className="block">
          <span className="text-sm">Contraseña</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" required minLength="6" />
        </label>
        <button className="w-full bg-green-600 text-white py-2 rounded">Registrar</button>
        <p className="mt-4 text-sm text-center">
          ¿Ya tenés cuenta? <Link to="/login" className="text-blue-600">Iniciar sesión</Link>
        </p>
      </form>
    </div>
  );
}
