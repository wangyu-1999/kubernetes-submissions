const todoList = [
  { id: 1, task: 'Todo 1' },
  { id: 2, task: 'Todo 2' },
  { id: 3, task: 'Todo 3' },
];
export const getTodoList = (_req, res) => {
  res.json(todoList);
};

export const createTodo = (req, res) => {
  const { task } = req.body;
  const newTodo = {
    id: todoList.length + 1,
    task,
  };
  todoList.push(newTodo);
  res.status(201).json(newTodo);
};
