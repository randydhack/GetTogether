'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Attendees";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          eventId: 1,
          status: 'member'
        },
        {
          userId: 2,
          eventId: 2,
          status: 'waitlist'
        },
        {
          userId: 3,
          eventId: 1,
          status: 'pending'
        },

      ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Attendees';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
