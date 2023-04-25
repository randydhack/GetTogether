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
        // member 1
        {
          memberId: 1,
          groupId: 2,
          status: 'member'
        },
        {
          memberId: 1,
          groupId: 3,
          status: 'co-host'
        },
        {
          memberId: 1,
          groupId: 4,
          status: 'pending'
        },
        // member 2
        {
          memberId: 2,
          groupId: 1,
          status: 'co-host'
        },
        {
          memberId: 2,
          groupId: 3,
          status: 'member'
        },
        {
          memberId: 2,
          groupId: 4,
          status: 'pending'
        },
        // member 3
        {
          memberId: 3,
          groupId: 4,
          status: 'member'
        },
        {
          memberId: 3,
          groupId: 2,
          status: 'co-host'
        },
        {
          memberId: 3,
          groupId: 1,
          status: 'pending'
        },
        //member 4
        {
          memberId: 4,
          groupId: 1,
          status: 'member'
        },
        {
          memberId: 4,
          groupId: 2,
          status: 'member'
        },
        {
          memberId: 4,
          groupId: 3,
          status: 'co-host'
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
