import { seedUsers } from './users.seeders.js';
import { seedStatuses } from './status.seeders.js';
import { seedPriority } from './prioridades.seeders.js';

export async function runSeeds() {
  try {
    await seedUsers();
    await seedStatuses();
    await seedPriority();

    console.log('Todas as seeds executadas com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao rodar seeds:', err);
    process.exit(1);
  }
}

runSeeds();
