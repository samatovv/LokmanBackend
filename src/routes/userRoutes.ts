import { Router, Request, Response } from 'express';
import {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} from '../controllers/userController';
import { AuthenticatedRequest, authenticateToken } from '../middlewares/authMiddleware';
import prisma from '../prisma/client';

const router = Router();

router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        login: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/', authenticateToken, createUser);
router.put('/:id', authenticateToken, updateUser);
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.delete('/:id', authenticateToken, deleteUser);



export default router;
