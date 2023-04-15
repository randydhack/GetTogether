'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {

    static associate(models) {
      // define association here
      Attendee.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Attendee.belongsTo(models.Event, {
        foreignKey: 'eventId'
      });

    }
  }
  Attendee.init({
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.ENUM('User', 'Event')
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};
