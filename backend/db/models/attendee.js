'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {

    static associate(models) {
      // define association here
    }
  }
  Attendee.init({
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};
