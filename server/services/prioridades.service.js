import * as prioridadesQueries from '../queries/prioridades.query.js';

export const prioridadeService = {
  async getAll() {
    const rows = await prioridadesQueries.getAll();
    return rows;
  },

  async getById(id_prioridade) {
    const rows = await prioridadesQueries.getByID(id_prioridade);
    return rows;
  },
};
