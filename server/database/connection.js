import mysql from 'mysql2/promise';

let pool;
let connection;

export async function createPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: '127.0.0.1',
      port: 8000,
      user: 'root',
      password: '123456',
      database: 'todo-list',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('Pool de conexões MySQL criado!');
  }
  return pool;
}

export async function createConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 8000,
      user: 'root',
      password: '123456',
      database: 'todo-list',
    });
    console.log('conection criada!');
  }
  return connection;
}

export function getDatabase() {
  if (!pool) throw new Error('Pool não foi inicializado. Chame createPool() antes.');
  return pool;
}
