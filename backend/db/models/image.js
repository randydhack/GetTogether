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
          if (instance !== null) {
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
          }

        }
      });
    }
  }

  Image.init(
    {
      url: DataTypes.STRING,
      imageableType: {
        type: DataTypes.ENUM("Group", "Event"),
        allowNull: false,
      },
      imageableId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      preview: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Image",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
    }
  );
  return Image;
};
