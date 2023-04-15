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
            instance.imageableType === "image" &&
            instance.image !== undefined
          ) {
            instance.imageable = instance.image;
          } else if (
            instance.imageableType === "UserProfile" &&
            instance.UserProfile !== undefined
          ) {
            instance.imageable = instance.UserProfile;
          } else if (
            instance.imageableType === "BlogPost" &&
            instance.BlogPost !== undefined
          ) {
            instance.imageable = instance.BlogPost;
          } else {
            instance.imageable = null;
          }
          // To prevent mistakes:
          delete instance.UserProfile;
          delete instance.dataValues.UserProfile;
          delete instance.BlogPost;
          delete instance.dataValues.BlogPost;
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
