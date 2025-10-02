import { taskService } from '../services/task.service.js';

export const taskController = {
  getAll: async (req, reply) => {
    const tasks = await taskService.getAll();
    return tasks;
  },

  getById: async (req, reply) => {
    const task = await taskService.getById(req.params.id_task);
    if (!task) return reply.code(404).send({ message: 'Task not found' });
    return task;
  },

  create: async (req, reply) => {
    const newTask = await taskService.create({
      title: req.body.title,
      body: req.body.body,
      id_status: req.body.id_status,
      id_users: req.body.id_users,
      id_priority: req.body.id_priority,
    });
    console.log(newTask);
    return reply.code(201).send(newTask);
  },

  update: async (req, reply) => {
    const updatedTask = await taskService.update(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      id_status: req.body.id_status,
      id_task: req.body.id_task,
      id_user: req.body.id_users,
      id_priority: req.body.id_priority,
    });
    return updatedTask;
  },

  delete: async (req, reply) => {
    const result = await taskService.deleteById(req.params.id);
    return result;
  },

  getTasksByUser: async (req, reply) => {
    const result = await taskService.getTasksByUser(req.params.id_user);
    return result;
  },
};
