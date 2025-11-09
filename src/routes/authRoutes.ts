import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { login, verify } from '../controllers/authController';

const router = express.Router();

router.get('/logout', (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    res.json({ message: 'Logged out' });
  });

router.post('/login', login as (req: Request, res: Response, next: NextFunction) => any);
router.get('/verify', verify as (req: Request, res: Response, next: NextFunction) => any);

export default router;
