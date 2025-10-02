import { createPool, getDatabase } from '../database/connection.js';
import * as userQueries from '../queries/users.query.js';

createPool();
const database = getDatabase();

export const userService = {
  async getAll() {
    const users = await userQueries.getAll();

    return users;
  },

  async getById(id_user) {
    const user = await userQueries.getByID(id_user);

    return user;
  },

  async create(user) {
    const dbUser = await userQueries.getByEmail(user.email);

    if (dbUser) {
      throw new Error('Ja existe um usuario com esse email');
    }

    const idUser = await userQueries.create({ ...user, active: user.active ?? 1 });
    const { password, ...createUser } = await userQueries.getByID(idUser);
    return createUser;
  },

  async update(id_user, user) {
    const dbUser = await userQueries.getByID(id_user);
    if (!dbUser) {
      throw new Error('Usuario não existe');
    }
    await userQueries.updateById(id_user, user);
    const updateUser = await userQueries.getByID(id_user);
    return { ...updateUser };
  },

  async deleteById(id_user) {
    const dbUser = await userQueries.getByID(id_user);
    if (!dbUser) {
      throw new Error('Usuario não existe');
    }

    await userQueries.deleteById(id_user);

    return { message: 'Usuario Apagada' };
  },
};
