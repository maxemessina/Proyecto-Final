const { Transaccion, Categoria, Usuario } = require('../models');

const obtenerTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll({
      include: [
        {
          model: Categoria,
          attributes: ['id', 'nombre', 'tipo']
        },
        {
          model: Usuario,
          attributes: ['id', 'nombre', 'email']
        }
      ],
      order: [['fecha', 'DESC'], ['created_at', 'DESC']]
    });

    res.json(transacciones);
  } catch (error) {
    console.error('Error al obtener el historial de transacciones:', error);
    res.status(500).json({ error: 'Error al obtener las transacciones' });
  }
};

const actualizarTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto, descripcion, fecha, categoria_id } = req.body;

    const transaccion = await Transaccion.findByPk(id);

    if (!transaccion) {
      return res.status(404).json({ error: 'Transaccion no encontrada' });
    }

    await transaccion.update({
      monto: monto !== undefined ? monto : transaccion.monto,
      descripcion: descripcion !== undefined ? descripcion : transaccion.descripcion,
      fecha: fecha !== undefined ? fecha : transaccion.fecha,
      categoria_id: categoria_id !== undefined ? categoria_id : transaccion.categoria_id
    });

    res.json({ 
      message: 'Transaccion actualizada exitosamente', 
      transaccion 
    });
  } catch (error) {
    console.error('Error al actualizar la transaccion:', error);
    res.status(500).json({ error: 'Error al actualizar la transaccion' });
  }
};

const eliminarTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    
    const transaccion = await Transaccion.findByPk(id);

    if (!transaccion) {
      return res.status(404).json({ error: 'Transaccion no encontrada' });
    }

    await transaccion.destroy();

    res.json({ message: 'Transaccion eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la transaccion:', error);
    res.status(500).json({ error: 'Error al eliminar la transaccion' });
  }
};

module.exports = {
  obtenerTransacciones,
  actualizarTransaccion,
  eliminarTransaccion
};