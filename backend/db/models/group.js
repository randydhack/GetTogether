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
    organizerId: {type: DataTypes.INTEGER, allowNull: false },
    name: {type: DataTypes.STRING, allowNull: false },
    about: {type: DataTypes.TEXT, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    private: {type: DataTypes.BOOLEAN, allowNull: false },
    city: {type: DataTypes.STRING, allowNull: false },
    state: {type: DataTypes.STRING, allowNull: false },
    previewImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
