'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Memberships";
    return queryInterface.bulkInsert(
      options,
      [
        {
          memberId: 1,
          groupId: 2,
          status: 'pending'
        },
        {
          memberId: 2,
          groupId: 1,
          status: 'member'
        },
        {
          memberId: 3,
          groupId: 1,
          status: 'co-host'
        },
        {
          memberId: 4,
          groupId: 1,
          status: 'pending'
        },
      ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      memberId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
