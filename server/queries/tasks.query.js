import { createPool, getDatabase } from '../database/connection.js';

createPool();

const database = getDatabase();

export async function getAll() {
  const tasks = await database.query('SELECT * FROM tasks');

  return tasks;
}

export async function updateById(id_task, data) {
  return await database.query(
    'UPDATE tasks SET title = ?, body = ?, id_status = ?, id_prioridade= ? WHERE id_task = ?',
    [data.title, data.body, data.id_status, data.id_priority, id_task],
  );
}

export async function deleteById(id_task) {
  await database.query('DELETE FROM tasks WHERE id_task = ?', [id_task]);
}

export async function getByID(id_task) {
  const result = await database.query('SELECT * FROM tasks WHERE id_task = ?', [id_task]);

  return result[0][0];
}

export async function create(data) {
  try {
    const result = await database.query(
      'INSERT INTO tasks (title, body, id_status, id_prioridade) VALUES (?, ?, ?, ?)',
      [data.title, data.body, data.id_status, data.id_priority],
    );

    return result[0].insertId;
  } catch (error) {
    console.error('erro ao criar a task');
  }
}

export async function getTasksByUser(id_user) {
  const result = await database.query(
    `SELECT t1.*, t2.title AS status_title, t3.prioridade AS prioridade_title FROM tasks AS t1 
    LEFT JOIN statuses AS t2 ON t1.id_status = t2.id_status 
    LEFT JOIN prioridades AS t3 ON t1.id_prioridade = t3.id_prioridade 
    WHERE id_task IN (SELECT id_task FROM users_tasks WHERE id_user = ?)`,
    [id_user],
  );

  return result[0];
}
