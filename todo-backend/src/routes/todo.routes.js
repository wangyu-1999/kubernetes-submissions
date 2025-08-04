import { Router } from 'express';

import { getTodoList, createTodo } from '../controllers/todo.controller.js';

const router = Router();

router.get('/todos', getTodoList);
router.post('/todos', createTodo);

export default router;
