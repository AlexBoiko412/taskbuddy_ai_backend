import { Router } from 'express';
import * as taskController from '../controllers/tasks';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getTasks);
router.put('/:id/complete', authMiddleware, taskController.completeTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

export default router;