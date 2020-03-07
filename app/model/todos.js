'use strict';

module.exports = app => {
  const { BOOLEAN, INTEGER, STRING, DATE, NOW } = app.Sequelize;

  const Todos = app.model.define('todos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    value: {
      type: STRING,
      allowNull: false
    },
    checked: {
      type: BOOLEAN,
      allowNull: false
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
  // Todos.associate = function(models) {
  //   // associations can be defined here
  // };
  // Todos.sync({
  //   force: true
  // })
  return Todos;
};