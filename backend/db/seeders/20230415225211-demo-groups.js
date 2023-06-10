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
          private: false,
          city: "Brooklyn",
          state: "NY",
          previewImage: "https://www.theclickcommunity.com/blog/wp-content/uploads/2014/05/playing-tennis-under-water-pic-by-Alix-Martinez.jpg",
        },
        {
          organizerId: 2,
          name: "San Francisco Biking",
          about:
            "Enjoy meeting new people while riding together as a group to various places in San Francisco",
          type: "In person",
          private: false,
          city: "San Francisco",
          state: "CA",
          previewImage: 'https://img.theculturetrip.com/wp-content/uploads/2018/03/32448014030_b0f7bbcb2c_b.jpg',
        },
        {
          organizerId: 3,
          name: "Weekend Gathering",
          about:
            "Gather up and experience variety of events that changes on a weekly basis.",
          type: "In person",
          private: true,
          city: "San Jose",
          state: "CA",
          previewImage: "https://www.gohawaii.com/sites/default/files/hero-unit-images/MH_01065-Annual%20Events%20and%20Festivals_0.jpg",
        },
        {
          organizerId: 4,
          name: "Cafe Gathering",
          about: "Gather up at a local cafe and get to know each other!",
          type: "In person",
          private: true,
          city: "San Jose",
          state: "CA",
          previewImage: "https://cafebenelux.com/wp-content/uploads/sites/4/2022/05/cafebenelux-1.jpeg",
        },
        {
          organizerId: 3,
          name: "San Francisco Friend Gather Up",
          about:
            "Local or new to the city, come join the group to meet people and make friend!",
          type: "In person",
          private: false,
          city: "San Francisco",
          state: "CA",
          previewImage: "https://cdn.vox-cdn.com/thumbor/sK3gMTENF_LR1DhAUl9e3V_5jC4=/0x0:2592x2017/1200x800/filters:focal(1089x801:1503x1215)/cdn.vox-cdn.com/uploads/chorus_image/image/65282724/friendscast.0.0.1429818191.0.jpg",
        },
        {
          organizerId: 1,
          name: "Online Gaming",
          about:
            "This group are for new gamers or veterans to that can meet up online to play game or talk about game interest!",
          type: "In person",
          private: false,
          city: "New York",
          state: "NY",
          previewImage: "https://ychef.files.bbci.co.uk/976x549/p091j3dx.jpg",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      organizerId: { [Op.in]: [1,2,3,4,5,6] }
    }, {});
  },
};
