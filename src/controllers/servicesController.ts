import { Request, Response } from 'express';
import prisma from "../prisma/client";

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.services.findMany({
      orderBy: {
        order: 'asc'
      }
    });
    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      short_description,
      title_ru,
      title_ky,
      title_tr,
      title_en,
      description_ru,
      description_ky,
      description_tr,
      description_en,
      short_description_ru,
      short_description_ky,
      short_description_tr,
      short_description_en,
      diagnostics,
      methods,
      images,
      order
    } = req.body;

    // Валидация: максимум 4 картинки
    if (images && Array.isArray(images) && images.length > 4) {
      res.status(400).json({ message: 'Maximum 4 images allowed' });
      return;
    }

    // Если order не указан, берем максимальный order + 1
    let serviceOrder = order;
    if (serviceOrder === undefined || serviceOrder === null) {
      const maxOrderService = await prisma.services.findFirst({
        orderBy: { order: 'desc' }
      });
      serviceOrder = maxOrderService ? maxOrderService.order + 1 : 0;
    }

    const service = await prisma.services.create({
      data: {
        title,
        description,
        short_description,
        title_ru,
        title_ky,
        title_tr,
        title_en,
        description_ru,
        description_ky,
        description_tr,
        description_en,
        short_description_ru,
        short_description_ky,
        short_description_tr,
        short_description_en,
        diagnostics,
        methods,
        images: images || [],
        order: serviceOrder
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
      return;
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
    const {
      title,
      description,
      short_description,
      title_ru,
      title_ky,
      title_tr,
      title_en,
      description_ru,
      description_ky,
      description_tr,
      description_en,
      short_description_ru,
      short_description_ky,
      short_description_tr,
      short_description_en,
      diagnostics,
      methods,
      images,
      order
    } = req.body;

    // Валидация: максимум 4 картинки
    if (images && Array.isArray(images) && images.length > 4) {
      res.status(400).json({ message: 'Maximum 4 images allowed' });
      return;
    }

    const service = await prisma.services.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        description,
        short_description,
        title_ru,
        title_ky,
        title_tr,
        title_en,
        description_ru,
        description_ky,
        description_tr,
        description_en,
        short_description_ru,
        short_description_ky,
        short_description_tr,
        short_description_en,
        diagnostics,
        methods,
        ...(images !== undefined && { images }),
        ...(order !== undefined && { order })
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

export const reorderServices = async (req: Request, res: Response) => {
  try {
    const { services } = req.body;

    if (!Array.isArray(services)) {
      res.status(400).json({ message: 'Services must be an array' });
      return;
    }

    // Обновляем порядок каждой услуги
    const updatePromises = services.map((service: { id: number; order: number }) =>
      prisma.services.update({
        where: { id: service.id },
        data: { order: service.order }
      })
    );

    await Promise.all(updatePromises);

    const updatedServices = await prisma.services.findMany({
      orderBy: { order: 'asc' }
    });

    res.json(updatedServices);
  } catch (error) {
    console.error('Reorder services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};