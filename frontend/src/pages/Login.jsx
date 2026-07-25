import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const rawFrom = location.state?.from?.pathname || '/dashboard';
  const from = rawFrom === '/login' ? '/dashboard' : rawFrom;

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Iniciar sesión</h2>
        {error && <div className="mb-2 text-red-600">{error}</div>}
        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border p-2 rounded" />
        </label>
        <label className="block mb-4">
          <span className="text-sm">Contraseña</span>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border p-2 rounded" />
        </label>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Entrar</button>
        <p className="mt-4 text-sm text-center">
          ¿No tenés cuenta? <Link to="/register" className="text-blue-600">Crear una</Link>
        </p>
      </form>
    </div>
  );
}
