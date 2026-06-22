import { DataTypes, Sequelize, Model } from 'sequelize';

export class Categoria extends Model {
  declare id: number;
  declare nombre: string;
  declare tipo: string;
  declare readonly created_at: Date;
}

export default (sequelize: Sequelize) => {
  Categoria.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El nombre no puede estar vacío',
          },
        },
      },
      tipo: {
        type: DataTypes.ENUM('ingreso', 'egreso'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Categoria',
      tableName: 'categorias',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  return Categoria;
};