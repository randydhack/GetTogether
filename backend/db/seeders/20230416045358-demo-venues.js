'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Venues";
    return queryInterface.bulkInsert(
      options,
      [
        {
          groupId: 1,
          address: "123 Disney Lane",
          city: "New York",
          state: "NY",
          lat: 37.7645358,
          lng: -122.4730327
        },
        {
          groupId: 1,
          address: "99 Orange Street",
          city: "Los Angeles",
          state: "CA",
          lat: 100.7645358,
          lng: -702.4730327
        }
      ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Venues';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1] }
    }, {});
  }
};
