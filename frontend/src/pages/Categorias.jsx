import React, { useEffect, useState } from "react";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("ingreso");

  const [editando, setEditando] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const [tipoEditado, setTipoEditado] = useState("ingreso");


  const cargarCategorias = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3001/api/categoria/obtener",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener categorías");
      }

      const data = await response.json();
      setCategorias(data);

    } catch (error) {
      console.error(error);
      setError("No se pudieron cargar las categorías");

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    cargarCategorias();
  }, []);


  const crearCategoria = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3001/api/categoria/crear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre,
            tipo,
          }),
        }
      );


      if (!response.ok) {
        throw new Error("No se pudo crear la categoría");
      }

      setNombre("");
      setTipo("ingreso");

      cargarCategorias();

    } catch (error) {
      console.error(error);
      setError("Error al crear categoría");
    }
  };


  const abrirEditar = (categoria) => {
    setEditando(categoria.id);
    setNombreEditado(categoria.nombre);
    setTipoEditado(categoria.tipo);
  };


  const editarCategoria = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3001/api/categoria/editar/${editando}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre: nombreEditado,
            tipo: tipoEditado,
          }),
        }
      );


      if (!response.ok) {
        throw new Error("No se pudo editar la categoría");
      }


      setEditando(null);
      cargarCategorias();


    } catch (error) {
      console.error(error);
      setError("Error al editar categoría");
    }
  };

  const eliminarCategoria = async (id) => {
  const confirmar = window.confirm(
    "¿Desea eliminar esta categoría?"
  );

  if (!confirmar) {
    return;
  }

  try {

    const token = localStorage.getItem("token");


    const response = await fetch(
      `http://localhost:3001/api/categoria/eliminar/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("No se pudo eliminar la categoría");
    }

    cargarCategorias();

  } catch (error) {

    console.error(error);
    setError("Error al eliminar categoría");

  }
};

  if (loading) {
    return <p>Cargando categorías...</p>;
  }


  return (
    <div>

      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Categorías
      </h1>

      {/* Tabla categorías */}
      <table className="w-full border-collapse mt-6">

        <thead>
          <tr className="bg-slate-700 text-white">

            <th className="p-3 text-left">
              Nombre
            </th>

            <th className="p-3 text-left">
              Tipo
            </th>

            <th className="p-3 text-center">
              Acciones
            </th>

          </tr>
        </thead>

        <tbody>

          {categorias.map((categoria) => (

            <tr
              key={categoria.id}
              className="border-b border-slate-600 hover:bg-slate-700/30"
            >

              <td className="p-3 text-gray-800">
                {categoria.nombre}
              </td>


              <td className="p-3 text-gray-800">
                {categoria.tipo}
              </td>


              <td className="p-3 text-center space-x-3">

                <button
                  onClick={() => abrirEditar(categoria)}
                  className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                >
                  Editar
                </button>


                <button
                 onClick={() => eliminarCategoria(categoria.id)}
                 className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500"
                >
                 Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* Crear categoría */}
      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
        Crear nueva categoría
      </h2>

      <form
        onSubmit={crearCategoria}
        className="mt-6 flex gap-3"
      >

        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="ingreso">
            Ingreso
          </option>

          <option value="egreso">
            Egreso
          </option>

        </select>


        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded"
        >
          Crear
        </button>

      </form>
        {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      {/* Editar */}
      {editando && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-96">

            <h2 className="text-xl font-bold mb-4">
              Editar categoría
            </h2>


            <form onSubmit={editarCategoria}>

              <input
                value={nombreEditado}
                onChange={(e) => setNombreEditado(e.target.value)}
                className="border p-2 w-full mb-3"
              />


              <select
                value={tipoEditado}
                onChange={(e) => setTipoEditado(e.target.value)}
                className="border p-2 w-full mb-3"
              >

                <option value="ingreso">
                  Ingreso
                </option>


                <option value="egreso">
                  Egreso
                </option>

              </select>


              <div className="flex gap-3">

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>


                <button
                  type="button"
                  onClick={() => setEditando(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}