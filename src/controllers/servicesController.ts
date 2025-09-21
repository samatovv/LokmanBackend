import { Request, Response } from 'express';
import prisma from "../prisma/client";

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.services.findMany(); // services, не service
    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { title, description, diagnostics, methods } = req.body;
    
    const service = await prisma.services.create({
      data: {
        title,
        description,
        diagnostics,
        methods
      }
    });
    
    res.status(201).json(service);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await prisma.services.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return; // ← return без значения
    }
    
    res.json(service);
  } catch (error) {
    console.error('Get service by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, diagnostics, methods } = req.body;
    
    const service = await prisma.services.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        description,
        diagnostics,
        methods
      }
    });
    
    res.json(service);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const service = await prisma.services.delete({
      where: {
        id: parseInt(id)
      }
    });
    
    res.json(service);
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};