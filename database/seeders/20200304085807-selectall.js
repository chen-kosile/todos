'use strict';
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('selectAlls', [{
        selectAll: 0,
        createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('selectAlls', null, {});
  }
};