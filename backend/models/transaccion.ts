import { DataTypes, Sequelize, Model } from "sequelize";

export class Transaccion extends Model {
  declare id: number;
  declare monto: number;
  declare descripcion: string;
  declare fecha: Date;
  declare usuario_id: number;
  declare categoria_id: number;
  declare readonly created_at: Date;
}

export default (sequelize: Sequelize) => {
  Transaccion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transaccion",
      tableName: "transacciones",
      timestamps: true,
      createdAt: "created_at",
    },
  );

  return Transaccion;
};
