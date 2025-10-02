import { getDatabase } from '../database/connection.js';

const database = getDatabase();

export async function getAll() {
  const [users] = await database.query('SELECT * FROM users');

  return users;
}

export async function updateById(id_user, data) {
  await database.query(
    'UPDATE users SET username = ?, email = ?, password = ?, active = ? WHERE id_user = ?',
    [data.username, data.email, data.password, data.active ?? 1, id_user],
  );
}

export async function deleteById(id_user) {
  await database.query('DELETE FROM users WHERE id_user = ?', [id_user]);
}

export async function getByID(id_user) {
  const [user] = await database.query('SELECT * FROM users WHERE id_user = ?', [id_user]);

  return user[0];
}

export async function getByEmail(email) {
  const [user] = await database.query('SELECT * FROM users WHERE email = ?', [email]);

  return user[0];
}

export async function create(data) {
  const result = await database.query(
    'INSERT INTO users (username, email, password, active) VALUES (?, ?, ?, ?)',
    [data.username, data.email, data.password, data.active],
  );

  return result[0].insertId;
}
