"use strict";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Portfolios", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true, // 🔥 ek user ka ek portfolio
      },

      title: {
        type: Sequelize.STRING,
        defaultValue: "My Portfolio",
      },

      bio: {
        type: Sequelize.TEXT,
        defaultValue: "Hi, I am a MERN Developer 🚀",
      },

      skills: {
        type: Sequelize.JSONB,
        defaultValue: ["React", "Node", "JavaScript"],
      },

      projects: {
        type: Sequelize.JSONB,
        defaultValue: [
          {
            title: "Portfolio Website",
            description: "My personal portfolio project",
          },
        ],
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Portfolios");
  },
};