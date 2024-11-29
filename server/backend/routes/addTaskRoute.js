// routes/taskRoutes.js
import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/addTask.js';
// import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/tasks',  createTask);
router.get('/alltask',  getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;