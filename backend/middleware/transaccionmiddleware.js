const validarCrearTransaccion = (req, res, next) => {

const { monto, descripcion, fecha, usuario_id, categoria_id } = req.body;

    if (!monto || isNaN(monto) || Number(monto) <= 0) {
    return res.status(400).json({
        error: "El monto debe ser un número mayor a 0",
    });
    }

    if (!descripcion || descripcion.trim() === "") {
    return res.status(400).json({
        error: "La descripción es obligatoria",
    });
    }

    if (!fecha) {
    return res.status(400).json({
        error: "La fecha es obligatoria",
    });
    }

    if (!usuario_id) {
    return res.status(400).json({
        error: "El usuario es obligatorio",
    });
    }

    if (!categoria_id) {
    return res.status(400).json({
        error: "La categoría es obligatoria",
    });
    }

    next();
};

const validarActualizarTransaccion = (req, res, next) => {
    const { monto, descripcion, fecha, categoria_id } = req.body;

    if (monto !== undefined && (isNaN(monto) || Number(monto) <= 0)) {
    return res.status(400).json({
        error: "El monto debe ser mayor a 0",
    });
    }

    if (descripcion !== undefined && descripcion.trim() === "") {
    return res.status(400).json({
        error: "La descripción no puede estar vacía",
    });
    }

    if (fecha !== undefined && fecha === "") {
    return res.status(400).json({
        error: "La fecha no puede estar vacía",
    });
    }

    if (categoria_id !== undefined && !categoria_id) {
    return res.status(400).json({
        error: "La categoría es obligatoria",
    });
    }

    next();
};

module.exports = {
    validarCrearTransaccion,
    validarActualizarTransaccion,
};
