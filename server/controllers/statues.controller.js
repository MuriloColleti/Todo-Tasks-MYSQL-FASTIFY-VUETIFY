import { statusService } from '../services/statues.service.js';

export const statusCrontroller = {
  getAll: async (req, reply) => {
    const status = await statusService.getAll();
    return status;
  },
};
