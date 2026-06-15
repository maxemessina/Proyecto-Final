require('dotenv').config();
const { Sequelize } = require('sequelize');

// preguntam si esta en producción (render)
const isProduction = process.env.NODE_ENV === 'production';

// crea la instancia de sequelize llamando a las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, 
    port: process.env.DB_PORT,
    logging: false, // true para ver las consultas SQL en terminal
    ...(isProduction && {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  }
);

// probar la conexión y despues eliminar esta función
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = sequelize;