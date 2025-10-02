import jwt from 'jsonwebtoken';
import * as userQueries from '../queries/users.query.js';

const secretKey = '123456';

export const authService = {
  async login(email, password) {
    const user = await userQueries.getByEmail(email);
    if (!user) {
      throw new Error('Credencias invalidas');
    }

    if (user.password !== password) {
      throw new Error('Credencias invalidas');
    }

    const token = jwt.sign(
      { email: user.email, username: user.username, id_user: user.id_user },
      secretKey,
      { expiresIn: '8h' },
    );

    return { token };
  },

  async validateToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      return false;
    }
  },
};
