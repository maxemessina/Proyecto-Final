const { Usuario /*, Transaccion */ } = require('../models'); // Importamos el modelo Usuario (y Transaccion cuando este listo)
const { generarToken } = require('../middleware/auth');

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar que no exista un usuario con ese email
    const existente = await Usuario.findOne({ where: { email } });
    if (existente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // TODO: Crear el usuario en la base de datos usando Usuario.create()
    const usuario = await Usuario.create({ 
      nombre, 
      email, 
      password 
    });    

    // TODO: Generar un token para el usuario recién creado usando generarToken()
    // const token = generarToken(usuario); 
    //comentado por ahora sin JWT

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario
      // token
      //comentado por ahora sin JWT
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: Buscar el usuario por email usando Usuario.findOne()
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // TODO: Validar la contraseña usando el método usuario.validarPassword()
    const passwordValida = await usuario.validarPassword(password);

    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // const token = generarToken(usuario);
    //comentado por ahora sin JWT

    res.json({
      message: 'Login exitoso',
      usuario,
      // token
      //comentado por ahora sin JWT
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const perfil = async (req, res) => {
  try {
    // TODO: Obtener el usuario desde la base de datos usando el id de req.user
    // Pista: req.user fue seteado por el middleware verificarToken
    const usuario = await Usuario.findByPk(req.params.id); { //req.params en vez req.user por ahora sin JWT
        // COMPLETAR bloque cuando Transaccion este listo
    }

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ usuario });
  } catch (error) {
    console.error('Error en perfil:', error);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

module.exports = { register, login, perfil };