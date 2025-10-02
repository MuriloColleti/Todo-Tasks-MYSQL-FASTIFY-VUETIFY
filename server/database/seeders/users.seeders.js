import { createConnection } from '../connection.js';

const database = await createConnection();

export async function seedUsers() {
  try {
    const users = [
      {
        username: 'admin',
        email: 'admin@email.com',
        password: '123456',
      },
    ];

    for (const user of users) {
      const [existUser] = await database.query('SELECT * FROM users WHERE email = ?;', [
        user.email,
      ]);

      if (!existUser.length) {
        await database.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
          user.username,
          user.email,
          user.password,
        ]);
        continue;
      }

      await database.query('UPDATE users SET username = ?, password = ? WHERE email = ?', [
        user.username,
        user.password,
        user.email,
      ]);
    }
  } catch (error) {
    console.error('Erro ao gerar a seed de usuario');
  }
}
