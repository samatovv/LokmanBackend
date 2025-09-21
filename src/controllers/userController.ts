import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../prisma/client';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { login, password, email, phone, firstName, lastName } = req.body;

    if (!login || !password || !email || !phone || !firstName || !lastName) {
        res.status(400).json({ message: 'Missing required fields' });
        return; 
      }
  
      const existingUser = await prisma.user.findUnique({ where: { login } });
      if (existingUser) {
        res.status(409).json({ message: 'User with this login already exists' });
        return;
      }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        login,
        password: hashedPassword,
        email,
        phone,
        firstName,
        lastName,
        role: 'user', 
      },
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        login: user.login,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { login, email, phone, firstName, lastName, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      const data: any = { login, email, phone, firstName, lastName };
  
      if (password) {
        data.password = await bcrypt.hash(password, 10);
      }
  
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data,
      });
  
      res.json({
        message: 'User updated successfully',
        user: {
          id: updatedUser.id,
          login: updatedUser.login,
          email: updatedUser.email,
          role: updatedUser.role,
        },
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error('Get user by ID error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      await prisma.user.delete({ where: { id: Number(id) } });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };