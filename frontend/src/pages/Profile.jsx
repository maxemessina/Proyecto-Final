import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function ProfilePage() {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id && !token) {
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        const res = await api.get(`/auth/perfil/${user.id}`);
        setProfile(res.data?.usuario || null);
      } catch (err) {
        setError(err?.response?.data?.error || 'No se pudo cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user?.id, token]);

  if (loading) return <div>Cargando perfil...</div>;

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Mi perfil</h1>
      {error && <div className="text-red-600">{error}</div>}
      {!error && profile && (
        <div className="space-y-3">
          <div>
            <div className="text-sm text-gray-500">Nombre</div>
            <div className="font-semibold">{profile.nombre}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-semibold">{profile.email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Transacciones</div>
            <div className="font-semibold">{profile.Transaccions?.length || 0}</div>
          </div>
        </div>
      )}
    </div>
  );
}
