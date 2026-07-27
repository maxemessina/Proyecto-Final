const { Transaccion, Categoria, Usuario } = require("../models");
const { fn, col, Op } = require('sequelize');

const crearTransaccion = async (req, res) => {
  try {
    const { monto, descripcion, fecha, usuario_id, categoria_id } = req.body;

    const transaccion = await Transaccion.create({
      monto,
      descripcion,
      fecha,
      usuario_id,
      categoria_id,
    });

    res.status(201).json({
      message: "Transaccion creada exitosamente",
      transaccion,
    });
  } catch (error) {
    console.error("Error al crear la transaccion:", error);
    res.status(500).json({
      error: "Error al crear la transaccion",
    });
  }
};

const obtenerTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll({
      include: [
        {
          model: Categoria,
          attributes: ["id", "nombre", "tipo"],
        },
        {
          model: Usuario,
          attributes: ["id", "nombre", "email"],
        },
      ],

      order: [
        ["fecha", "DESC"],
        ["created_at", "DESC"],
      ],
    });
    res.json(transacciones);
  } catch (error) {
    console.error("Error al obtener el historial de transacciones:", error);
    res.status(500).json({ error: "Error al obtener las transacciones" });
  }
};

const obtenerTransaccionesFiltradas = async (req, res) => {
  try {
    const {
      categoria_id,
      usuario_id,
      fechaDesde,
      fechaHasta,
    } = req.query;

    const where = {};

    if (categoria_id) {
      where.categoria_id = categoria_id;
    }

    if (usuario_id) {
      where.usuario_id = usuario_id;
    }

    if (fechaDesde && fechaHasta) {
      where.fecha = {
        [Op.between]: [fechaDesde, fechaHasta],
      };
    }

    const transacciones = await Transaccion.findAll({
      where,
      include: [
        {
          model: Categoria,
          attributes: ["id", "nombre", "tipo"],
        },
        {
          model: Usuario,
          attributes: ["id", "nombre", "email"],
        },
      ],
      order: [
        ["fecha", "DESC"],
      ],
    });

    res.json(transacciones);
  } catch (error) {
    console.error("Error al filtrar transacciones:", error);

    res.status(500).json({
      error: "Error al filtrar transacciones",
    });
  }
};

const actualizarTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto, descripcion, fecha, categoria_id } = req.body;
    const transaccion = await Transaccion.findByPk(id);
    
    if (!transaccion) {
      return res.status(404).json({ error: "Transaccion no encontrada" });
    }
    
    await transaccion.update({
      monto: monto !== undefined ? monto : transaccion.monto,
      descripcion:
        descripcion !== undefined ? descripcion : transaccion.descripcion,
      fecha: fecha !== undefined ? fecha : transaccion.fecha,
      categoria_id:
        categoria_id !== undefined ? categoria_id : transaccion.categoria_id,
    });

    res.json({
      message: "Transaccion actualizada exitosamente",
      transaccion,
    });
  } catch (error) {
    console.error("Error al actualizar la transaccion:", error);
    res.status(500).json({ error: "Error al actualizar la transaccion" });
  }
};

const eliminarTransaccion = async (req, res) => {
  try {
    const { id } = req.params;

    const transaccion = await Transaccion.findByPk(id);

    if (!transaccion) {
      return res.status(404).json({ error: "Transaccion no encontrada" });
    }

    await transaccion.destroy();

    res.json({ message: "Transaccion eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la transaccion:", error);
    res.status(500).json({ error: "Error al eliminar la transaccion" });
  }
};

const obtenerBalance = async (req, res) => {
  try {
    // Espera que verificarToken haya puesto la info decodificada en req.user
    const usuario_id = req.user?.id;

    if (!usuario_id) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const registros = await Transaccion.findAll({
      where: { usuario_id },
      attributes: [
        [fn('SUM', col('monto')), 'total']
      ],
      include: [
        {
          model: Categoria,
          attributes: ['id', 'tipo'], 
        }
      ],
      group: ['Categorium.tipo', 'Categorium.id'],
      raw: true,
      nest: true
    });

    let ingresos = 0;
    let egresos = 0;

    registros.forEach(item => {
      const total = parseFloat(item.total) || 0;
      const tipo = item.Categorium ? item.Categorium.tipo : null;

      if (tipo === 'ingreso') {
        ingresos += total;
      } else if (tipo === 'egreso') {
        egresos += total;
      }
    });

    const balanceNeto = ingresos - egresos;

    return res.status(200).json({
      status: 'success',
      data: {
        ingresos,
        egresos,
        balanceNeto
      }
    });

  } catch (error) {
    console.error('Error al calcular el balance con Sequelize:', error);

    return res.status(500).json({
      message: 'Error interno del servidor al calcular el balance'
    });
  }
};

module.exports = {
  crearTransaccion,
  obtenerTransacciones,
  obtenerTransaccionesFiltradas,
  actualizarTransaccion,
  eliminarTransaccion,
  obtenerBalance, 
};