import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export interface JwtPayload {
  userId: number;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // Сначала ищем в Authorization заголовке
  const authHeader = req.headers['authorization'];
  let token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) // Убираем "Bearer "
    : null;

  // Если не нашли в заголовке, ищем в cookies
  if (!token) {
    token = req.cookies?.token;
  }

  if (!token) {
    res.status(401).json({ message: 'Access token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};