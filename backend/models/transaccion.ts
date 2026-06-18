import { DataTypes, Sequelize, Model } from "sequelize";

export class Transaccion extends Model {
  public id!: number;
  public monto!: number;
  public descripcion!: string;
  public fecha!: Date;
  public usuario_id!: number;
  public categoria_id!: number;
  public readonly created_at!: Date;
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
