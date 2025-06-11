"use strict";
const { Model } = require("sequelize");
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Todo, {
      //   foreignKey: 'userId',
      //   as: 'todos',
      //   onDelete: 'CASCADE'
      // });
      // User.hasMany(models.Product, {
      //   foreignKey: 'userId',
      //   as: 'products',
      //   onDelete: 'CASCADE'
      // });
    }
    static async hashPassword(password) {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    }

    static async comparePassword(password, hashedPassword) {
      return await bcrypt.compare(password, hashedPassword);
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      plan: DataTypes.STRING,

    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
