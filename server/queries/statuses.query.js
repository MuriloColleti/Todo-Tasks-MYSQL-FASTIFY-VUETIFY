import { createPool, getDatabase } from '../database/connection.js';

createPool();

const database = getDatabase();

export async function getAll() {
  const result = await database.query('SELECT * FROM statuses');

  return result[0];
}

export async function getByID(id_status) {
  const result = await database.query('SELECT * FROM statuses WHERE id_status = ?', [id_status]);

  return result[0][0];
}
