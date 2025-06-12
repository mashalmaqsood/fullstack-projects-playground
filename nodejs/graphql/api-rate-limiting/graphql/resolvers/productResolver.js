const { Op } = require("sequelize");
const { Product } = require("../../db/models");

module.exports = {
  Query: {
    searchProducts: async (_, args) => {
      const {
        name,
        description,
        category,
        minPrice,
        maxPrice,
        minQuantity,
        maxQuantity,
        lowStock,
      } = args;
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
        return Product.findAll({ where: whereClause });
      } catch (error) {
        console.log("seaarch Products error", error);
        throw new Error("error fetching products");
      }
    },
  },
};
