import Todo from '../models/Todo.js';

import { sequelize } from './db.js';
export const initializeDatabase = async () => {
  try {
    await sequelize.sync();
    const todoCount = await Todo.count();
    console.log('Database has been initialized.');
    if (todoCount === 0) {
      console.log('Todos table is empty, seeding with default data...');
      await Todo.bulkCreate([
        { task: 'Todo 1' },
        { task: 'Todo 2', completed: true },
        { task: 'Todo 3' },
      ]);
      console.log('Default todos created successfully.');
    } else {
      console.log('Todos table already has data, skipping seed.');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};
