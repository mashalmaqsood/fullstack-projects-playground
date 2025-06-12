const { Op } = require("sequelize");
const { Todo } = require("../../db/models");

module.exports = {
  Query: {
    searchTodos: async (_, args) => {
      const { name, description } = args;
      try {
        let whereClause = {};

        if (name) {
          whereClause.name = { [Op.iLike]: `%${name}%` };
        }
        if (description) {
          whereClause.description = { [Op.iLike]: `%${description}%` };
        }
        const todos = await Todo.findAll({ where: whereClause });
        return todos;
      } catch (error) {
        console.error("Error searching todos:", error);
        throw new Error("Server error while searching todos.");
      }
    },
  },
};
