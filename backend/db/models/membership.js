'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {

    static associate(models) {
      // define association here
      Membership.belongsTo(models.User, {
        foreignKey: 'memberId',

      })

      Membership.belongsTo(models.Group, {
        foreignKey: 'groupId',
      })
    }
  }
  Membership.init({
    memberId: {type: DataTypes.INTEGER, allowNull: false },
    groupId: {type: DataTypes.INTEGER, allowNull: false },
    status: {type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Membership',
    defaultScope: {
      exclude: ['updatedAt', 'createdAt']
    }
  });
  return Membership;
};
