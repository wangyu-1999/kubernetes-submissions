import Todo from '../models/Todo.js';
export const getTodoList = async (_req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todo list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTodo = async (req, res) => {
  const { task } = req.body;
  try {
    const newTodo = await Todo.create({ task });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
