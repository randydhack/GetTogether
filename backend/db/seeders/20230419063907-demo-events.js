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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Ac placerat vestibulum lectus mauris. Vestibulum rhoncus est pellentesque elit ullamcorper. Sed felis eget velit aliquet sagittis id consectetur. Tellus mauris a diam maecenas sed enim. Quisque id diam vel quam elementum pulvinar etiam. Eget aliquet nibh praesent tristique magna sit amet. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Ut placerat orci nulla pellentesque. Cras pulvinar mattis nunc sed. Gravida neque convallis a cras semper auctor. Etiam tempor orci eu lobortis. Lacus laoreet non curabitur gravida arcu ac tortor dignissim. Mi sit amet mauris commodo quis imperdiet massa, Mi proin sed libero enim sed faucibus turpis. Arcu odio ut sem nulla pharetra diam sit amet nisl. Tristique senectus et netus et malesuada fames ac. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh. Vulputate eu scelerisque felis imperdiet proin fermentum. Amet porttitor eget dolor morbi. Praesent elementum facilisis leo vel. Pulvinar mattis nunc sed blandit libero. Sit amet consectetur adipiscing elit. Quis viverra nibh cras pulvinar mattis nunc. Neque sodales ut etiam sit amet nisl purus. Felis imperdiet proin fermentum leo vel. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Etiam sit amet nisl purus in mollis nunc sed. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. Maecenas sed enim ut sem viverra aliquet eget sit amet. Tellus elementum sagittis vitae et leo duis ut diam quam. Dui vivamus arcu felis bibendum ut tristique et egestas quis. Platea dictumst quisque sagittis purus sit.",
          startDate: "2023-11-19 16:00:00",
          endDate: "2023-11-19 19:00:00",
          previewImage: "image url",
        },
        {
          groupId: 2,
          venueId: 2,
          name: "Golf Second Meet and Greet",
          type: "In Person",
          capacity: 25,
          price: 0.0,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Ac placerat vestibulum lectus mauris. Vestibulum rhoncus est pellentesque elit ullamcorper. Sed felis eget velit aliquet sagittis id consectetur. Tellus mauris a diam maecenas sed enim. Quisque id diam vel quam elementum pulvinar etiam. Eget aliquet nibh praesent tristique magna sit amet. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Ut placerat orci nulla pellentesque. Cras pulvinar mattis nunc sed. Gravida neque convallis a cras semper auctor. Etiam tempor orci eu lobortis. Lacus laoreet non curabitur gravida arcu ac tortor dignissim. Mi sit amet mauris commodo quis imperdiet massa, Mi proin sed libero enim sed faucibus turpis. Arcu odio ut sem nulla pharetra diam sit amet nisl. Tristique senectus et netus et malesuada fames ac. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh. Vulputate eu scelerisque felis imperdiet proin fermentum. Amet porttitor eget dolor morbi. Praesent elementum facilisis leo vel. Pulvinar mattis nunc sed blandit libero. Sit amet consectetur adipiscing elit. Quis viverra nibh cras pulvinar mattis nunc. Neque sodales ut etiam sit amet nisl purus. Felis imperdiet proin fermentum leo vel. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Etiam sit amet nisl purus in mollis nunc sed. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. Maecenas sed enim ut sem viverra aliquet eget sit amet. Tellus elementum sagittis vitae et leo duis ut diam quam. Dui vivamus arcu felis bibendum ut tristique et egestas quis. Platea dictumst quisque sagittis purus sit.",
          startDate: "2021-11-19 12:00:00",
          endDate: "2021-11-19 16:00:00",
          previewImage: "image url",
        },
        {
          groupId: 3,
          venueId: 1,
          name: "Soccer Meet up",
          type: "In Person",
          capacity: 10,
          price: 20.99,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Ac placerat vestibulum lectus mauris. Vestibulum rhoncus est pellentesque elit ullamcorper. Sed felis eget velit aliquet sagittis id consectetur. Tellus mauris a diam maecenas sed enim. Quisque id diam vel quam elementum pulvinar etiam. Eget aliquet nibh praesent tristique magna sit amet. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Ut placerat orci nulla pellentesque. Cras pulvinar mattis nunc sed. Gravida neque convallis a cras semper auctor. Etiam tempor orci eu lobortis. Lacus laoreet non curabitur gravida arcu ac tortor dignissim. Mi sit amet mauris commodo quis imperdiet massa, Mi proin sed libero enim sed faucibus turpis. Arcu odio ut sem nulla pharetra diam sit amet nisl. Tristique senectus et netus et malesuada fames ac. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh. Vulputate eu scelerisque felis imperdiet proin fermentum. Amet porttitor eget dolor morbi. Praesent elementum facilisis leo vel. Pulvinar mattis nunc sed blandit libero. Sit amet consectetur adipiscing elit. Quis viverra nibh cras pulvinar mattis nunc. Neque sodales ut etiam sit amet nisl purus. Felis imperdiet proin fermentum leo vel. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Etiam sit amet nisl purus in mollis nunc sed. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. Maecenas sed enim ut sem viverra aliquet eget sit amet. Tellus elementum sagittis vitae et leo duis ut diam quam. Dui vivamus arcu felis bibendum ut tristique et egestas quis. Platea dictumst quisque sagittis purus sit.",
          startDate: "2024-04-07 12:00:00",
          endDate: "2024-04-07 18:00:00",
          previewImage:
            "https://media.istockphoto.com/id/1199894704/photo/african-american-young-boy-playing-soccer-in-a-stadium-pitch-child-running-with-soccer-ball.jpg?s=612x612&w=0&k=20&c=mRKKlAIo7CoWLKcxQGbSaKYO6_VdWxa1NpAtqb4oBT4=",
        },
        {
          groupId: 3,
          venueId: 1,
          name: "PLAY LEAGUE",
          type: "Online",
          capacity: 80,
          price: 0.0,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue quisque egestas diam in arcu cursus euismod quis. Ac placerat vestibulum lectus mauris. Vestibulum rhoncus est pellentesque elit ullamcorper. Sed felis eget velit aliquet sagittis id consectetur. Tellus mauris a diam maecenas sed enim. Quisque id diam vel quam elementum pulvinar etiam. Eget aliquet nibh praesent tristique magna sit amet. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Ut placerat orci nulla pellentesque. Cras pulvinar mattis nunc sed. Gravida neque convallis a cras semper auctor. Etiam tempor orci eu lobortis. Lacus laoreet non curabitur gravida arcu ac tortor dignissim. Mi sit amet mauris commodo quis imperdiet massa, Mi proin sed libero enim sed faucibus turpis. Arcu odio ut sem nulla pharetra diam sit amet nisl. Tristique senectus et netus et malesuada fames ac. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh. Vulputate eu scelerisque felis imperdiet proin fermentum. Amet porttitor eget dolor morbi. Praesent elementum facilisis leo vel. Pulvinar mattis nunc sed blandit libero. Sit amet consectetur adipiscing elit. Quis viverra nibh cras pulvinar mattis nunc. Neque sodales ut etiam sit amet nisl purus. Felis imperdiet proin fermentum leo vel. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Etiam sit amet nisl purus in mollis nunc sed. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. Maecenas sed enim ut sem viverra aliquet eget sit amet. Tellus elementum sagittis vitae et leo duis ut diam quam. Dui vivamus arcu felis bibendum ut tristique et egestas quis. Platea dictumst quisque sagittis purus sit.",
          startDate: "2024-11-19 08:00:00",
          endDate: "2024-11-19 12:00:00",
          previewImage:
            "https://static.wikia.nocookie.net/leagueoflegends/images/7/7b/League_of_Legends_Cover.jpg/revision/latest?cb=20191018222445",
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
