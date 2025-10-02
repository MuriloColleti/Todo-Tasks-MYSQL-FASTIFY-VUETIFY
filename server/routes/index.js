import fastify from 'fastify';
import controllers from '../controllers/index.js';
import taskRoutes from './task.route.js';
import userRoutes from './user.route.js';
import authRoutes from './auth.route.js';

export async function routes(fastify, options) {
  fastify.get('/', controllers.helloWord);
  fastify.register(taskRoutes, { prefix: '/tasks' });
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(authRoutes, { prefix: '/auth' });
}
