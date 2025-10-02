import * as statusQuery from '../queries/statuses.query.js';

export const statusService = {
  async getAll() {
    const rows = await statusQuery.getAll();
    return rows;
  },

  async getById(id_status) {
    const rows = await statusQuery.getByID(id_status);
    return rows;
  },
};
