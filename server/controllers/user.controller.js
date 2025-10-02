import { userService } from '../services/users.service.js';

export const userController = {
  getAll: async (req, reply) => {
    const users = await userService.getAll('SELECT FROM users');
    return users;
  },

  getById: async (req, reply) => {
    const user = await userService.getById(req.params.id_user);
    if (!user) return reply.code(404).send({ message: 'User not found' });
    return user;
  },

  create: async (req, reply) => {
    const newUser = await userService.create(req.body);
    return reply.code(201).send(newUser);
  },

  update: async (req, reply) => {
    const updatedUser = await userService.update(req.params.id, req.body);
    return updatedUser;
  },

  deleteById: async (req, reply) => {
    const result = await userService.deleteById(req.params.id);
    return result[0];
  },
};
