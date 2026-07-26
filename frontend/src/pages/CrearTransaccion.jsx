import React from "react";
import FormularioTransaccion from "../components/Transactions/FormularioTransaccion";

export default function CrearTransaccion() {
    return (
    <div>
        <h1 className="text-2xl font-bold mb-4">
        Crear Transacción
        </h1>

        <p className="text-gray-600 mb-6">
        Complete los datos para registrar una nueva transacción.
        </p>

        <FormularioTransaccion />
    </div>
    );
}