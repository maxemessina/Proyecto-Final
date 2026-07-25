const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_por_defecto';

function generarToken(usuario) {
  // TODO: Generar un token JWT con el id y email del usuario.
  return jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '24h' });
}

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // TODO: Extraer el token del header Authorization.
  const partes = authHeader.split(' ')[1];
  const token = partes.length == 2 ? partes[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  try {
    // TODO: Verificar y decodificar el token con jwt.verify()
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = { generarToken, verificarToken };
