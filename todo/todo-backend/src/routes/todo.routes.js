import { Router } from 'express';

import {
  getTodoList,
  createTodo,
  markTodoAsCompleted,
} from '../controllers/todo.controller.js';

const router = Router();

router.get('/todos', getTodoList);
router.post('/todos', createTodo);
router.put('/todos/:id', markTodoAsCompleted);

export default router;
