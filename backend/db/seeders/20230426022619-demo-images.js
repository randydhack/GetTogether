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
        url: 'https://img.theculturetrip.com/wp-content/uploads/2018/03/32448014030_b0f7bbcb2c_b.jpg',
        imageableType: 'Group',
        imageableId: 2,
        preview: false
      },
      {
        url: 'https://www.gohawaii.com/sites/default/files/hero-unit-images/MH_01065-Annual%20Events%20and%20Festivals_0.jpg',
        imageableType: 'Group',
        imageableId: 3,
        preview: false
      },
      {
        url: 'https://cafebenelux.com/wp-content/uploads/sites/4/2022/05/cafebenelux-1.jpeg',
        imageableType: 'Group',
        imageableId: 4,
        preview: false
      },
      {
        url: 'https://cdn.vox-cdn.com/thumbor/sK3gMTENF_LR1DhAUl9e3V_5jC4=/0x0:2592x2017/1200x800/filters:focal(1089x801:1503x1215)/cdn.vox-cdn.com/uploads/chorus_image/image/65282724/friendscast.0.0.1429818191.0.jpg',
        imageableType: 'Group',
        imageableId: 5,
        preview: false
      },
      {
        url: 'https://ychef.files.bbci.co.uk/976x549/p091j3dx.jpg',
        imageableType: 'Group',
        imageableId: 6,
        preview: false
      },
      {
        url: 'https://photoresources.wtatennis.com/photo-resources/2019/10/11/42af59f2-8e76-4673-8235-f443d3e92092/IsGZnrYM.jpg?width=1200&height=630',
        imageableType: 'Event',
        imageableId: 1,
        preview: false
      },
      {
        url: 'https://s.hdnux.com/photos/01/31/47/46/23493040/4/1200x0.jpg',
        imageableType: 'Event',
        imageableId: 2,
        preview: true,
      },
      {
        url: 'https://api.triviacreator.com/v1/imgs/quiz/ghiblifood-d61f97b0-8099-4537-93fa-18cf3ed59173.jpg',
        imageableType: 'Event',
        imageableId: 3,
        preview: true,
      },
      {
        url: 'https://blizzardwatch.com/wp-content/uploads/2017/12/Onyxia_raid_WoWTCG.jpg',
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
