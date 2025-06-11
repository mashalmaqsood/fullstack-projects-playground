const { Op } = require("sequelize");
const { Todo } = require("../models");

//search todos
exports.searchTodos = async (req, res) => {
  const { name, description } = req.query;
  try {
    let whereClause = {};

    if (name) {
      whereClause.name = { [Op.iLike]: `%${name}%` };
    }
    if (description) {
      whereClause.description = { [Op.iLike]: `%${description}%` };
    }
    const todos = await Todo.findAll({ where: whereClause });
    res.json(todos);
  } catch (error) {
    console.error("Error searching todos:", error);
    res.status(500).json({ error: "Server error while searching todos." });
  }
};
