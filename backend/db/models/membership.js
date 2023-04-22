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
    memberId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Membership',
    defaultScope: {
      exclude: ['updatedAt', 'createdAt']
    }
  });
  return Membership;
};
