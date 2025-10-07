import * as tasksQueries from '../queries/tasks.query.js';
import * as usersTaskQueries from '../queries/users-task.query.js';

const NOT_COMPLET_ID_STATUS = 1;
const ID_PRIORITY_LOW = 1;

export const taskService = {
  async getAll() {
    const rows = await tasksQueries.getAll();

    return rows[0];
  },

  async getById(id_task) {
    const task = await tasksQueries.getByID(id_task);

    return task;
  },

  async create(data) {
    const taskId = await tasksQueries.create({
      title: data.title,
      body: data.body,
      id_status: data.id_status || NOT_COMPLET_ID_STATUS,
      id_priority: data.id_priority || ID_PRIORITY_LOW,
    });
    const task = await tasksQueries.getByID(taskId);

    if (data.id_users) await this.handleTaskUsers(taskId, data.id_users);

    return task;
  },

  async update(id_task, data) {
    await tasksQueries.updateById(id_task, {
      title: data.title,
      body: data.body,
      id_status: data.id_status ?? NOT_COMPLET_ID_STATUS,
      id_users: data.id_users || '',
      id_priority: data.id_priority ?? ID_PRIORITY_LOW,
    });

    if (data.id_users) await this.handleTaskUsers(id_task, data.id_users);

    const task = await tasksQueries.getByID(id_task);

    return task;
  },

  async deleteById(id_task) {
    const dbTask = await tasksQueries.getByID(id_task);
    if (!dbTask) {
      throw new Error('Task não encontrada');
    }
    await usersTaskQueries.deleteByTask(id_task);

    await tasksQueries.deleteById(id_task);
    return { mensage: 'Task Apagada' };
  },

  async handleTaskUsers(id_task, userIds) {
    const taskUsers = await usersTaskQueries.getByTaskId(id_task);

    const usersToDelete = taskUsers.filter((element) => !userIds.includes(element.id_user));

    for (const user of usersToDelete) {
      await usersTaskQueries.deleteById(user.id_user, id_task);
    }

    for (const idUser of userIds) {
      const userExistInTask = taskUsers.find((element) => element.id_user === idUser);
      if (userExistInTask) continue;

      await usersTaskQueries.create({ id_user: idUser, id_task });
    }
  },

  async getTasksByUser(id_user) {
    const tasks = await tasksQueries.getTasksByUser(id_user);

    for (const task of tasks) {
      const users = await usersTaskQueries.getByTaskId(task.id_task);

      task.id_users = users.map((element) => element.id_user);
    }

    return tasks;
  },
};
