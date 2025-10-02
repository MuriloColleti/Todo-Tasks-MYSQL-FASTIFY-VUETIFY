import { createPool, getDatabase } from '../database/connection.js';

createPool();

const database = getDatabase();

export async function getAll() {
  const result = await database.query('SELECT * FROM prioridades');

  return result[0];
}
