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
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};
