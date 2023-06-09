'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Attendees';
    return queryInterface.bulkInsert(options, [
      {
        eventId: 2,
        userId: 1,
        status: 'member'
      },
      {
        eventId: 3,
        userId: 2,
        status: 'member'
      },
      {
        eventId: 3,
        userId: 1,
        status: 'waitlist'
      },
      {
        eventId: 3,
        userId: 4,
        status: 'pending'
      },
      {
        eventId: 4,
        userId: 4,
        status: 'pending'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Attendees';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
