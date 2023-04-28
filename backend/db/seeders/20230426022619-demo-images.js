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
        url: 'group-image1',
        imageableType: 'Group',
        imageableId: 1,
        preview: true
      },
      {
        url: 'group-image2',
        imageableType: 'Group',
        imageableId: 1,
        preview: false
      },
      {
        url: 'event-image3',
        imageableType: 'Event',
        imageableId: 2,
        preview: false
      },
      {
        url: 'event-image4',
        imageableType: 'Event',
        imageableId: 2,
        preview: true,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['group-image1','group-image2','event-image3','event-image4'] }
    }, {});
  }
};
