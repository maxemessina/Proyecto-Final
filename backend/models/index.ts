// backend/models/index.js
import { Sequelize } from 'sequelize';
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

//importar cada funcion incializadora y clase
import initUsuario, { Usuario } from './usuario';
// import initTransaccion, { Transaccion } from './transaccion';
// import initCategoria, { Categoria } from './categoria';

//inicializar cada modelo
initUsuario(sequelize);
// initTransaccion(sequelize);
// initCategoria(sequelize);

// configuracion de relaciones

module.exports = {
  sequelize,
  Sequelize,
  Usuario
} //export para usar en los controllers