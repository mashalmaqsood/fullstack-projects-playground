const { Op } = require("sequelize");
const { Product } = require("../models");

//create product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, quantity, price, category, userId } = req;
    const newProduct = await Product.create({
      name,
      description,
      quantity,
      price,
      category,
      userId,
    });
    res.status(201).json({ newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//search product
exports.searchProducts = async (req, res) => {
  const {
    name,
    description,
    category,
    minPrice,
    maxPrice,
    minQuantity,
    maxQuantity,
    lowStock,
  } = req.query;
  try {
    let whereClause = {};

    if (name) whereClause.name = { [Op.iLike]: `%${name}%` };
    if (description)
      whereClause.description = { [Op.iLike]: `%${description}%` };
    if (category) whereClause.category = { [Op.iLike]: `%${category}%` };
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) whereClause.price[Op.lte] = parseFloat(maxPrice);
    }
    if (minQuantity || maxQuantity) {
      whereClause.quantity = {};
      if (minQuantity) whereClause.quantity[Op.gte] = parseInt(minQuantity);
      if (maxQuantity) whereClause.quantity[Op.lte] = parseInt(maxQuantity);
    }
    if (lowStock === "true") whereClause.quantity = { [Op.lte]: 20 };
    const todos = await Product.findAll({ where: whereClause });
    res.json(todos);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Server error while searching products." });
  }
};
