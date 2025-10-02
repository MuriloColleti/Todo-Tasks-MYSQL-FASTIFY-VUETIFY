import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.user.middleware.js';

export default async function userRoutes(fastify, options) {
  fastify.get('/', { preHandler: [authMiddleware] }, userController.getAll);
  fastify.get('/:id', { preHandler: [authMiddleware] }, userController.getById);
  fastify.post('/', { preHandler: [authMiddleware] }, userController.create);
  fastify.put('/:id', { preHandler: [authMiddleware] }, userController.update);
  fastify.delete('/:id', { preHandler: [authMiddleware] }, userController.deleteById);
}
