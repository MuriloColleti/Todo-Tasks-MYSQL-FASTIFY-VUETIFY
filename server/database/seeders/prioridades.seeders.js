import { createConnection } from '../connection.js';

const database = await createConnection();

export async function seedPriority() {
  try {
    const priorities = [
      { prioridade: 'Baixa', id_prioridade: 1 },
      { prioridade: 'Media', id_prioridade: 2 },
      { prioridade: 'Alta', id_prioridade: 3 },
    ];

    for (const priority of priorities) {
      const [existPriority] = await database.query(
        'SELECT * FROM prioridades WHERE id_prioridade = ?',
        [priority.id_prioridade],
      );

      if (!existPriority.length) {
        await database.query('INSERT INTO prioridades (id_prioridade, prioridade) VALUES (?, ?)', [
          priority.id_prioridade,
          priority.prioridade,
        ]);
        continue;
      }

      await database.query('UPDATE prioridades SET prioridade = ? WHERE id_prioridade = ?', [
        priority.prioridade,
        priority.id_prioridade,
      ]);
    }
  } catch (error) {
    console.error('Erro ao ao gerar seed statues ' + error);
  }
}
