import { authService } from '../services/auth.service.js';

export async function authMiddleware(request, reply) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.code(401).send({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = authService.validateToken(token);
    if (!decoded) throw new Error(' Token invalido');

    request.user = decoded;
  } catch (err) {
    return reply.code(401).send({ message: 'Token inválido ou expirado' });
  }
}
