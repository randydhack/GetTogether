'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {

    getImageable(options) {
      if (!this.imageableType) return Promise.resolve(null);
      const mixinMethodName = `get${this.imageableType}`;
      return this[mixinMethodName](options);
    }

    static associate(models) {
      // define association here
      Attendee.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Attendee.belongsTo(models.Event, {
        foreignKey: 'eventId'
      });

      Attendee.addHook("afterFind", async (result) => {
        if (!Array.isArray(result)) result = [result];
        for (const instance of result) {
          if (
            instance.imageableType === "Image" &&
            instance.image !== undefined
          ) {
            instance.imageable = instance.Image;
          } else if (
            instance.imageableType === "User" &&
            instance.User !== undefined
          ) {
            instance.imageable = instance.User;
          } else if (
            instance.imageableType === "Event" &&
            instance.Event !== undefined
          ) {
            instance.imageable = instance.Event;
          } else {
            instance.imageable = null;
          }
          // To prevent mistakes:
          delete instance.User;
          delete instance.dataValues.User;
          delete instance.Event;
          delete instance.dataValues.Event;
        }
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
