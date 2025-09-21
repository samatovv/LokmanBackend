import prisma from "../prisma/client";
import { Request, Response } from 'express';

export const getBanners = async (req: Request, res: Response) => {
  try {
    const banners = await prisma.banners.findMany();
    res.json(banners);
  } catch (error) {
    console.error('Get banners error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBannerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const banner = await prisma.banners.findUnique({ 
      where: { id: Number(id) } 
    });
    
    if (!banner) {
      res.status(404).json({ message: 'Banner not found' });
      return;
    }
    
    res.json(banner);
  } catch (error) {
    console.error('Get banner by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const banner = await prisma.banners.delete({ 
      where: { id: Number(id) } 
    });
    res.json(banner);
  } catch (error) {
    console.error('Delete banner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createBanner = async (req: Request, res: Response) => {
  try {
    const { 
      title, 
      title_ru, 
      title_ky, 
      title_tr, 
      title_en 
    } = req.body;
    const image = req.file?.filename || '';
    
    const banner = await prisma.banners.create({
      data: {
        title,
        title_ru,
        title_ky,
        title_tr,
        title_en,
        image: `${req.protocol}://${req.get('host')}/uploads/${image}`,
      },
    });
    
    res.status(201).json(banner);
  } catch (error) {
    console.error('Create banner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      title_ru, 
      title_ky, 
      title_tr, 
      title_en 
    } = req.body;
    const file = req.file;
    
    const updateData: any = {
      title,
      title_ru,
      title_ky,
      title_tr,
      title_en,
    };
    
    if (file) {
      updateData.image = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    }
    
    const updatedBanner = await prisma.banners.update({
      where: { id: Number(id) },
      data: updateData,
    });
    
    res.json(updatedBanner);
  } catch (error) {
    console.error('Update banner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};