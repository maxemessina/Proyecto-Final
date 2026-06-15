import { DataTypes, Sequelize, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export class Usuario extends Model {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public password!: string;
  public readonly created_at!: Date;

  // TODO: Comparar la contraseña recibida con el hash almacenado
  public async validarPassword(passwordRecibida: string): Promise<boolean> {
    return await bcrypt.compare(passwordRecibida, this.password);
  }

  public toJSON(): object {
    const values = { ...this.get() };
    delete values.password; // ocultamos la contraseña
    return values;
  }

}

export default (sequelize: Sequelize) => {
  Usuario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar vacío" }
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'email',
        msg: "Este email ya se encuentra registrado."
      },
      validate: {
        isEmail: { msg: "Debe ingresar un formato de correo válido" },
        notEmpty: { msg: "El email es obligatorio" }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "La contraseña debe tener al menos 6 caracteres"
        }
      }
    }
  }, {
    sequelize, // pasa la instancia de conexión
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'created_at',
    // updatedAt: 'updated_at', // por si agrego un endpoint PUT para actualizar usuarios en el futuro    
    hooks: {
      // TODO: Hashear la contraseña antes de guardar el usuario
      beforeCreate: async (usuario: Usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      }
    }
  });

  return Usuario;
};