import database from './pool.database.js';

let db;

beforeAll(async () => {
  db = await database.createPoolTeste();
});

afterAll(async () => {
  if (db) await db.end();
});

test('deve conectar ao banco de dados de teste', async () => {
  expect(db).toBeDefined();

  const [rows] = await db.query('SELECT 1 + 1 AS resultado');
  expect(rows[0].resultado).toBe(2);
});
