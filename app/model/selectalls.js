'use strict';

module.exports = app => {
  const { BOOLEAN, INTEGER, DATE, NOW } = app.Sequelize;

  const SelectAlls = app.model.define('selectalls', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    selectAll: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: DATE,
      defaultValue: NOW
    },
    updatedAt: {
      allowNull: false,
      type: DATE,
      defaultValue: NOW
    }
  }, {});
  // SelectAlls.associate = function(models) {
  //   // associations can be defined here
  // };
  // selectAlls.sync({
  //   force: true
  // })
  return SelectAlls;
};