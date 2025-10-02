import { authService } from '../services/auth.service.js';

export const authController = {
  async login(req) {
    const response = await authService.login(req.body.email, req.body.password);
    return response;
  },
};
