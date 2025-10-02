import { prioridadeService } from '../services/prioridades.service.js';

export const prioridadesCrontroller = {
  getAll: async (req, reply) => {
    const prioridade = await prioridadeService.getAll();
    return prioridade;
  },

  getByID: async (req, reply) => {
    const prioridade = await prioridadeService.getById(req.params.id);
    return prioridade;
  },
};
