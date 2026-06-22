// backend/models/index.ts
import { Sequelize } from "sequelize";
import config from "../config/database";

const env = process.env.NODE_ENV || "development";
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
    dialectOptions: dbConfig.dialectOptions,
  },
);

//importar cada funcion incializadora y clase
import initUsuario, { Usuario } from "./usuario";
import initCategoria, { Categoria } from "./categoria";
import initTransaccion, { Transaccion } from "./transaccion";

//inicializar cada modelo
initUsuario(sequelize);
initCategoria(sequelize);
initTransaccion(sequelize);

// configuracion de relaciones

Usuario.hasMany(Transaccion, {
  foreignKey: "usuario_id",
});

Transaccion.belongsTo(Usuario, {
  foreignKey: "usuario_id",
});

Categoria.hasMany(Transaccion, {
  foreignKey: "categoria_id",
});

Transaccion.belongsTo(Categoria, {
  foreignKey: "categoria_id",
});

export { sequelize, Sequelize, Usuario, Categoria, Transaccion };
