'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const products = [];
    const categories = ['Electronics', 'Clothing', 'Books', 'Furniture', 'Toys'];
   
    for (let i = 1; i <= 1000; i++) {
      products.push({
        name: `Product${i}`,
        description: `This is a detailed description for Product ${i}. It is one of our bestsellers.`,
        quantity: Math.floor(Math.random() * 100) + 1,
        price: (Math.random() * 500).toFixed(2),
        category: categories[Math.floor(Math.random() * categories.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Products', products, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  }
};
