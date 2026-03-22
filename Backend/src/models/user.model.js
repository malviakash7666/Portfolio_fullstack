import { DataTypes } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // 🔑 login ke liye
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // 🔑 public portfolio URL
      },

      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "Users",
      timestamps: true,
    }
  );

  return User;
};