'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
        queryInterface.addColumn('Users', 'first_name', {
            type: Sequelize.STRING,
            allowNull: true,
        }),
          queryInterface.addColumn('Users', 'last_name', {
            type: Sequelize.STRING,
            allowNull: true,
        }),
        queryInterface.addColumn('Users', 'profile_url', {
          type: Sequelize.STRING,
          allowNull: true,
        }),
        queryInterface.addColumn('Users', 'profile_thumbnail_url', {
          type: Sequelize.STRING,
          allowNull: true,
        })
      ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
        queryInterface.removeColumn('Users', 'first_name'),
        queryInterface.removeColumn('Users', 'last_name'),
        queryInterface.removeColumn('Users', 'profile_url'),
        queryInterface.removeColumn('Users', 'profile_thumbnail_url')
      ]);
  }
};
