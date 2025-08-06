import { Model, Sequelize } from 'sequelize';

import { sequelize } from '../db/db.js';

class Todo extends Model {}

Todo.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    task: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'todo',
  }
);

export default Todo;
