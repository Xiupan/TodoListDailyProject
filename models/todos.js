'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todos = sequelize.define('Todo', {
    item: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Todos;
};
