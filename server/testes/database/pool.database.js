import mysql from 'mysql2/promise';

let pool;
let connection;

async function createPoolTeste() {
  if (!pool) {
    pool = mysql.createPool({
      host: '127.0.0.1',
      port: 8000,
      user: 'root',
      password: '123456',
      database: 'todo-list-teste',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

async function createConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 8000,
      user: 'root',
      password: '123456',
      database: 'todo-list-teste',
    });
    console.log('conexão criada!');
  }
  return connection;
}

function getDatabase() {
  if (!pool) throw new Error('Pool não foi inicializado. Chame createPool() antes.');
  return pool;
}

export default {
  createPoolTeste,
  createConnection,
  getDatabase,
};
