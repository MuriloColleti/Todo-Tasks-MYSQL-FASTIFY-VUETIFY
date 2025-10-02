import { getDatabase } from '../database/connection.js';

const database = getDatabase();

export async function create(data) {
  const result = await database.query('INSERT INTO users_tasks (id_user, id_task) VALUES (?, ?)', [
    data.id_user,
    data.id_task,
  ]);

  return result[0].insertId;
}

export async function deleteById(id_user, id_task) {
  await database.query('DELETE FROM users_tasks WHERE id_user = ? AND id_task = ?', [
    id_user,
    id_task,
  ]);
}

export async function getByTaskId(id_task) {
  const task = await database.query('SELECT * FROM users_tasks WHERE id_task = ?', [id_task]);

  return task[0];
}

export async function deleteByTask(id_task) {
  await database.query('DELETE FROM users_tasks WHERE id_task = ?', [id_task]);
}
