'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Images';
    return queryInterface.bulkInsert(options, [
      {
        url: 'https://www.theclickcommunity.com/blog/wp-content/uploads/2014/05/playing-tennis-under-water-pic-by-Alix-Martinez.jpg',
        imageableType: 'Group',
        imageableId: 1,
        preview: true
      },
      {
        url: 'https://www.theclickcommunity.com/blog/wp-content/uploads/2014/05/playing-tennis-under-water-pic-by-Alix-Martinez.jpg',
        imageableType: 'Group',
        imageableId: 2,
        preview: false
      },
      {
        url: 'https://www.theclickcommunity.com/blog/wp-content/uploads/2014/05/playing-tennis-under-water-pic-by-Alix-Martinez.jpg',
        imageableType: 'Group',
        imageableId: 3,
        preview: false
      },
      {
        url: 'https://historicbridges.org/ohio/mainavenue/little_main_9000_1_2vib.jpg',
        imageableType: 'Group',
        imageableId: 4,
        preview: false
      },
      {
        url: 'https://historicbridges.org/ohio/mainavenue/little_main_9000_1_2vib.jpg',
        imageableType: 'Group',
        imageableId: 5,
        preview: false
      },
      {
        url: 'https://www.theclickcommunity.com/blog/wp-content/uploads/2014/05/playing-tennis-under-water-pic-by-Alix-Martinez.jpg',
        imageableType: 'Group',
        imageableId: 6,
        preview: false
      },
      {
        url: 'https://historicbridges.org/ohio/mainavenue/little_main_9000_1_2vib.jpg',
        imageableType: 'Event',
        imageableId: 1,
        preview: false
      },
      {
        url: 'https://historicbridges.org/ohio/mainavenue/little_main_9000_1_2vib.jpg',
        imageableType: 'Event',
        imageableId: 2,
        preview: true,
      },
      {
        url: 'https://historicbridges.org/ohio/mainavenue/little_main_9000_1_2vib.jpg',
        imageableType: 'Event',
        imageableId: 3,
        preview: true,
      },
      {
        url: 'https://historicbridges.org/ohio/mainavenue/little_main_9000_1_2vib.jpg',
        imageableType: 'Event',
        imageableId: 4,
        preview: true,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://historicbridges.org/ohio/mainavenue/little_main_9000_1_2vib.jpg','https://www.theclickcommunity.com/blog/wp-content/uploads/2014/05/playing-tennis-under-water-pic-by-Alix-Martinez.jpg'] }
    }, {});
  }
};
