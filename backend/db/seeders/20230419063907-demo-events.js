'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Events";
    return queryInterface.bulkInsert(
      options,
      [
        {
          groupId: 1,
          venueId: null,
          name: "Tennis Group First Meet and Greet",
          type: 'Online',
          capacity: 10,
          price: 1.00,
          startDate: "2021-11-19 20:00:00",
          endDate: "2021-11-19 20:00:00",
          previewImage: 'image url'
        },
        {
          groupId: 2,
          venueId: 2,
          name: "Golf Second Meet and Greet",
          type: 'In Person',
          capacity: 25,
          price: 0.00,
          startDate: "2021-11-19 20:00:00",
          endDate: "2021-11-19 20:00:00",
          previewImage: 'image url'
        },
        {
          groupId: 3,
          venueId: 1,
          name: "Soccer Meet up",
          type: 'In Person',
          capacity: 10,
          price: 20.99,
          startDate: "2021-11-19 20:00:00",
          endDate: "2021-11-19 20:00:00",
          previewImage: 'image url'
        },
        {
          groupId: 3,
          venueId: 1,
          name: "PLAY LEAGUE",
          type: 'ONLINE',
          capacity: 80,
          price: 0.00,
          startDate: "2021-11-19 20:00:00",
          endDate: "2021-11-19 20:00:00",
          previewImage: 'image url'
        }
      ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3] }
    }, {});
  }
};
