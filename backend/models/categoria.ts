import { DataTypes, Sequelize, Model } from 'sequelize';

export class Categoria extends Model {
  public id!: number;
  public nombre!: string;
  public tipo!: string;
  public readonly created_at!: Date;
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
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El tipo no puede estar vacío',
          },
        },
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