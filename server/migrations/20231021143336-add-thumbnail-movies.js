'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Movies', 'poster_thumbnail_url', {
        type: Sequelize.STRING,
        allowNull: true,
      });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Movies', 'poster_thumbnail_url');
  }
};
