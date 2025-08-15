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
    if (!task) {
      console.error('Task is required');
      return res.status(400).json({ error: 'Task is required' });
    }
    if (task.length > 140) {
      console.error('Task must be at most 140 characters long');
      return res
        .status(400)
        .json({ error: 'Task must be at most 140 characters long' });
    }
    const newTodo = await Todo.create({ task });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const markTodoAsCompleted = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    todo.completed = true;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
