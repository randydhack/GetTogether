"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Events";
    return queryInterface.bulkInsert(
      options,
      [
        {
          groupId: 1,
          venueId: 3,
          name: "Tennis Group First Meet and Greet",
          type: "Online",
          capacity: 10,
          price: 1.0,
          description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Ac placerat vestibulum lectus mauris.'          startDate: "2023-11-19 16:00:00",
          endDate: "2023-11-19 19:00:00",
          previewImage: "https://historicbridges.org/ohio/mainavenue/little_main_9000_1_2vib.jpg",
        },
        {
          groupId: 2,
          venueId: 2,
          name: "Golf Second Meet and Greet",
          type: "In Person",
          capacity: 25,
          price: 0.0,
          description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Ac placerat vestibulum lectus mauris.'          startDate: "2021-11-19 12:00:00",
          endDate: "2021-11-19 16:00:00",
          previewImage: "https://historicbridges.org/ohio/mainavenue/little_main_9000_1_2vib.jpg",
        },
        {
          groupId: 3,
          venueId: 1,
          name: "Soccer Meet up",
          type: "In Person",
          capacity: 10,
          price: 20.99,
          description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Ac placerat vestibulum lectus mauris.'          startDate: "2024-04-07 12:00:00",
          endDate: "2024-04-07 18:00:00",
          previewImage:
            "https://historicbridges.org/ohio/mainavenue/little_main_9000_1_2vib.jpg",
        },
        {
          groupId: 3,
          venueId: 1,
          name: "PLAY LEAGUE",
          type: "Online",
          capacity: 80,
          price: 0.0,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Ac placerat vestibulum lectus mauris.',
          startDate: "2024-11-19 08:00:00",
          endDate: "2024-11-19 12:00:00",
          previewImage:
            "https://historicbridges.org/ohio/mainavenue/little_main_9000_1_2vib.jpg",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Events";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        groupId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
