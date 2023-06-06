"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Groups";
    return queryInterface.bulkInsert(
      options,
      [
        {
          organizerId: 1,
          name: "Evening Tennis on the Water",
          about:
            "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
          type: "In person",
          private: true,
          city: "New York",
          state: "NY",
          previewImage: "image url",
        },
        {
          organizerId: 2,
          name: "Tennis Next to Bay-Bridge",
          about:
            "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
          type: "In person",
          private: true,
          city: "San Francisco",
          state: "CA",
          previewImage: 'image url',
        },
        {
          organizerId: 3,
          name: "GROUP 3",
          about:
            "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
          type: "In person",
          private: true,
          city: "Manhattan",
          state: "NY",
          previewImage: "image url",
        },
        {
          organizerId: 4,
          name: "Cafe Gathering",
          about: "Gather up at a local cafe and get to know each other!",
          type: "In person",
          private: true,
          city: "San Jose",
          state: "CA",
          previewImage: "image url",
        },
        {
          organizerId: 3,
          name: "GROUP 5",
          about:
            "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
          type: "In person",
          private: false,
          city: "San Francisco",
          state: "CA",
          previewImage: "image url",
        },
        {
          organizerId: 1,
          name: "GROUP 6",
          about:
            "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
          type: "In person",
          private: false,
          city: "New York",
          state: "NY",
          previewImage: "image url",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      organizerId: { [Op.in]: [1,2,3,4,5,6,7,8] }
    }, {});
  },
};
