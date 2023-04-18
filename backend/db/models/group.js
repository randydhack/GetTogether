'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {

    static associate(models) {

      Group.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        as: 'GroupImages',
        scope: {
          imageableType: 'Group'
        }
      });

      Group.belongsTo(models.User, {
        foreignKey: 'organizerId',
        as: 'Organizer'
      })

      Group.hasMany(models.Membership, {
        foreignKey: 'groupId',
        // as: 'numMembers'
      })

      Group.hasMany(models.Event, {
        foreignKey: 'groupId'
      })

      Group.hasMany(models.Venue, {
        foreignKey: 'groupId'
      })

    }
  }
  Group.init({
    organizerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    about: DataTypes.TEXT,
    type: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    previewImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
