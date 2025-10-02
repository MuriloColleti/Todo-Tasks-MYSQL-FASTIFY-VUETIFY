import { statusCrontroller } from '../controllers/statues.controller.js';
import { taskController } from '../controllers/task.controller.js';
import { authMiddleware } from '../middleware/auth.user.middleware.js';

export default async function taskRoutes(fastify, options) {
  fastify.get('/', { preHandler: [authMiddleware] }, taskController.getAll);
  fastify.get('/:id', { preHandler: [authMiddleware] }, taskController.getById);
  fastify.post('/', { preHandler: [authMiddleware] }, taskController.create);
  fastify.put('/:id', { preHandler: [authMiddleware] }, taskController.update);
  fastify.delete('/:id', { preHandler: [authMiddleware] }, taskController.delete);

  fastify.get('/statuses', { preHandler: [authMiddleware] }, statusCrontroller.getAll);

  fastify.get('/user/:id_user', { preHandler: [authMiddleware] }, taskController.getTasksByUser);
}
