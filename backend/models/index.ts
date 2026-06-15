// backend/models/index.ts
import { Sequelize } from 'sequelize';
import config from '../config/database';

const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];

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

export { sequelize, Sequelize, Usuario };