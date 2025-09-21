import prisma from "../prisma/client";
import { Request, Response } from 'express';

export const getBanners = async (req: any, res: any) => {
    const banners = await prisma.banners.findMany();
    res.json(banners);
};

export const getBannerById = async (req: any, res: any) => {
    const { id } = req.params;
    const banner = await prisma.banners.findUnique({ where: { id: Number(id) } });
    if (!banner) {
        res.status(404).json({ message: 'Banner not found' });
        return;
    }
    res.json(banner);
};

export const deleteBanner = async (req: any, res: any) => {
    const { id } = req.params;
    const banner = await prisma.banners.delete({ where: { id: Number(id) } });
    res.json(banner);
};

export const createBanner = async (req: Request, res: Response) => {
  const { title } = req.body;
  const image = req.file?.filename || '';
  
  try {
    const banner = await prisma.banners.create({
      data: {
        title,
        image: `${req.protocol}://${req.get('host')}/uploads/${image}`, // Полный URL
      },
    });
    
    res.status(201).json(banner);
  } catch (error) {
    console.error('Create banner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
  

export const updateBanner = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, image } = req.body;
    const file = req.file;
  
    try {
      const updatedBanner = await prisma.banners.update({
        where: { id: Number(id) },
        data: {
          title,
          ...(file && { image: file.filename }), 
        },
      });
  
      res.json(updatedBanner);
    } catch (error) {
      console.error('Update banner error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };