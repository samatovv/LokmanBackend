import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: 'Login and password required' });
  }

  const user = await prisma.user.findUnique({ where: { login } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,        
    sameSite: 'none',       
    maxAge: 1000 * 60 * 60 * 8,
    path: '/',
    domain: 'sigmamedtrade.kg',
  });

  res.json({ token, role: user.role });
};

export const verify = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    if (!token) {
      token = req.cookies?.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Access token missing', valid: false });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        login: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found', valid: false });
    }

    res.json({
      valid: true,
      user: {
        id: user.id,
        login: user.login,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (err) {
    res.status(403).json({ message: 'Invalid token', valid: false });
  }
};
