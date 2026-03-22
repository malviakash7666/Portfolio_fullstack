import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Portfolio = sequelize.define(
    "Portfolio",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },

      title: DataTypes.STRING,

      bio: DataTypes.TEXT,

      skills: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },

      projects: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
    },
    {
      tableName: "Portfolios",
    }
  );

  return Portfolio;
};