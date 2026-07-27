import React, { useState } from "react";
import { DollarSign, FileText, Calendar, Tags } from "lucide-react";

export default function FormularioTransaccion() {
    const [monto, setMonto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState("");
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      setError("");
      setMensaje("");

      if (!monto) {
        setError("El monto es obligatorio");
        return;
      }

      if (Number(monto) <= 0) {
        setError("El monto debe ser mayor a 0");
        return;
      }

      if (!descripcion.trim()) {
        setError("La descripción es obligatoria");
        return;
      }

      if (!fecha) {
        setError("Debe seleccionar una fecha");
        return;
      }

      const fechaIngresada = new Date(fecha);

      if (isNaN(fechaIngresada.getTime())) {
        setError("La fecha ingresada no es válida");
        return;
      }

      if (!categoria) {
        setError("Debe seleccionar una categoría");
        return;
      }

      // Obtener usuario desde localStorage (si está logueado)
      let usuario_id = null;
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          usuario_id = parsed?.id || null;
        }
      } catch (err) {
        // ignore parse errors
      }

      if (!usuario_id) {
        setError('Usuario no autenticado. Inicie sesión para crear transacciones.');
        return;
      }

      const payload = {
        monto: Number(monto),
        descripcion: descripcion.trim(),
        fecha,
        usuario_id,
        categoria_id: Number(categoria),
      };

      try {
        const token = localStorage.getItem('token');
        const base = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
        const res = await fetch(`${base}/transaccion/crear`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setMensaje('Transacción creada correctamente.');

          // limpia el formulario
          setMonto("");
          setDescripcion("");
          setFecha("");
          setCategoria("");
        } else {
          const data = await res.json().catch(() => ({}));
          setError(data.error || 'Error al crear la transacción');
        }
      } catch (error) {
        console.error('Error en creación:', error);
        const msg = error?.message || 'Error en la petición';
        setError(msg);
      }
    };


    return (
        <div className="mt-6 p-6 border rounded shadow-sm bg-gray-50">

            {/* Header */}
            <div className="border-b pb-5 mb-6">
                <h2 className="text-xl font-bold">
                    Crear Transacción
                </h2>

                <p className="text-gray-600 text-sm mt-1">
                    Complete los datos para registrar una nueva transacción.
                </p>
            </div>


            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Monto */}
                <div>
                    <label
                        htmlFor="monto"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Monto
                    </label>

                    <div className="relative">
                        <DollarSign 
                            className="absolute left-3 top-3 text-gray-500 w-5 h-5" 
                        />

                        <input
                            id="monto"
                            type="number"
                            value={monto}
                            onChange={(e) => setMonto(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Ingrese el monto"
                        />
                    </div>
                </div>


                {/* Descripción */}
                <div>
                    <label
                        htmlFor="descripcion"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Descripción
                    </label>

                    <div className="relative">
                        <FileText 
                            className="absolute left-3 top-3 text-gray-500 w-5 h-5" 
                        />

                        <input
                            id="descripcion"
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Ingrese una descripción"
                        />
                    </div>
                </div>


                {/* Fecha */}
                <div>
                    <label
                        htmlFor="fecha"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Fecha
                    </label>

                    <div className="relative">
                        <Calendar 
                            className="absolute left-3 top-3 text-gray-500 w-5 h-5" 
                        />

                        <input
                            id="fecha"
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                </div>


                {/* Categoría */}
                <div>
                    <label
                        htmlFor="categoria"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Categoría
                    </label>

                    <div className="relative">
                        <Tags 
                            className="absolute left-3 top-3 text-gray-500 w-5 h-5" 
                        />

                        <select
                            id="categoria"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="">
                                Seleccione una categoría
                            </option>

                            <option value="1">
                                Ingreso
                            </option>

                            <option value="2">
                                Egreso
                            </option>
                        </select>
                    </div>
                </div>


                
                {error && (
                    <p className="text-red-600 text-sm text-center">
                        {error}
                    </p>
                )}


                {mensaje && (
                    <p className="text-green-600 text-sm text-center">
                        {mensaje}
                    </p>
                )}


                {/* Botón */}
                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition cursor-pointer"
                >
                    Crear Transacción
                </button>

            </form>

        </div>
    );
}