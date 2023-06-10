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
          type: "In Person",
          capacity: 10,
          price: 1.0,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Ac placerat vestibulum lectus mauris.",
          startDate: "2023-11-19 16:00:00",
          endDate: "2023-11-19 19:00:00",
          previewImage:
            "https://photoresources.wtatennis.com/photo-resources/2019/10/11/42af59f2-8e76-4673-8235-f443d3e92092/IsGZnrYM.jpg?width=1200&height=630",
        },
        {
          groupId: 2,
          venueId: 2,
          name: "Around San Francisco",
          type: "In Person",
          capacity: 25,
          price: 0.0,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Ac placerat vestibulum lectus mauris.",
          startDate: "2021-11-19 12:00:00",
          endDate: "2021-11-19 16:00:00",
          previewImage:
            "https://s.hdnux.com/photos/01/31/47/46/23493040/4/1200x0.jpg",
        },
        {
          groupId: 3,
          venueId: 1,
          name: "Gather Up and Eat Food",
          type: "In Person",
          capacity: 35,
          price: 10,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Ac placerat vestibulum lectus mauris.",
          startDate: "2024-04-07 12:00:00",
          endDate: "2024-04-07 18:00:00",
          previewImage:
            "https://api.triviacreator.com/v1/imgs/quiz/ghiblifood-d61f97b0-8099-4537-93fa-18cf3ed59173.jpg",
        },
        {
          groupId: 6,
          venueId: 1,
          name: "World of Warcraft Raid Night",
          type: "Online",
          capacity: 20,
          price: 0.0,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Ac placerat vestibulum lectus mauris.",
          startDate: "2024-11-19 08:00:00",
          endDate: "2024-11-19 12:00:00",
          previewImage:
            "https://blizzardwatch.com/wp-content/uploads/2017/12/Onyxia_raid_WoWTCG.jpg",
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
