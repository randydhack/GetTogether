'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {

    static associate(models) {

      Group.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'Group'
        }
      });

      Group.hasMany(models.Membership, {
        foreignKey: 'groupId'
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
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
