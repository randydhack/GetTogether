"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    getImageable(options) {
      if (!this.imageableType) return Promise.resolve(null);
      const mixinMethodName = `get${this.imageableType}`;
      return this[mixinMethodName](options);
    }

    static associate(models) {
      Image.belongsTo(models.Event, {
        foreignKey: "imageableId",
        constraints: false,
      });
      Image.belongsTo(models.Group, {
        foreignKey: "imageableId",
        constraints: false,
      });

      Image.addHook("afterFind", async (result) => {
        if (!Array.isArray(result)) result = [result];
        for (const instance of result) {
          if (
            instance.imageableType === "Image" &&
            instance.image !== undefined
          ) {
            instance.imageable = instance.Image;
          } else if (
            instance.imageableType === "Group" &&
            instance.Group !== undefined
          ) {
            instance.imageable = instance.Group;
          } else if (
            instance.imageableType === "Event" &&
            instance.Event !== undefined
          ) {
            instance.imageable = instance.Event;
          } else {
            instance.imageable = null;
          }
          // To prevent mistakes:
          delete instance.Group;
          delete instance.dataValues.Group;
          delete instance.Event;
          delete instance.dataValues.Event;
        }
      });
    }
  }

  Image.init(
    {
      url: DataTypes.STRING,
      imageableType: DataTypes.ENUM('Group', 'Event'),
      imageableId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
