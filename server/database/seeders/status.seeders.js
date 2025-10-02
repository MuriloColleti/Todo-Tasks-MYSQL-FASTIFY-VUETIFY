import { createConnection } from '../connection.js';

const database = await createConnection();

export async function seedStatuses() {
  try {
    const statues = [
      { title: 'Pendente', id_status: 1 },
      { title: 'Em Andamento', id_status: 2 },
      { title: 'Concluido', id_status: 3 },
    ];

    for (const status of statues) {
      const [existStatus] = await database.query('SELECT * FROM statuses WHERE id_status = ?', [
        status.id_status,
      ]);

      if (!existStatus.length) {
        await database.query('INSERT INTO statuses (id_status, title) VALUES (?, ?)', [
          status.id_status,
          status.title,
        ]);
        continue;
      }

      await database.query('UPDATE statuses SET title = ? WHERE id_status = ?', [
        status.title,
        status.id_status,
      ]);
    }
  } catch (error) {
    console.error('Erro ao ao gerar seed statues ' + error);
  }
}
