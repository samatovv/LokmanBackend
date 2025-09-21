import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getProducts = async (req: Request, res: Response) => {
  try {
      const { categoryId, subCategoryId, minPrice, maxPrice, isTop } = req.query;

      const where: any = {};

      if (subCategoryId) {
          where.categoryId = Number(subCategoryId);
        } else if (categoryId) {
          const subcategories = await prisma.category.findMany({
              where: {
                  parentId: Number(categoryId)
              },
              select: { id: true }
          });
      
          const subcategoryIds = subcategories.map(sub => sub.id);
      
          if (subcategoryIds.length > 0) {
              where.categoryId = { in: subcategoryIds };
          } else {
              where.categoryId = Number(categoryId);
          }
      }      

      if (isTop === 'true') {
          where.isTop = true;
      }

      if (minPrice || maxPrice) {
          where.price = {};
          if (minPrice) {
              where.price.gte = Number(minPrice);
          }
          if (maxPrice) {
              where.price.lte = Number(maxPrice);
          }
      }

      const products = await prisma.product.findMany({
          where,
          include: {
              category: {
                  select: {
                      id: true,
                      name: true,
                      parentId: true
                  },
              },
          },
      });

      res.json(products);
  } catch (error) {
      console.error('Get products error:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

// controllers/product.ts
export const getTopProductsByCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const topProducts = await prisma.product.findMany({
      where: {
        categoryId: Number(id),
        isTop: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      }
    });
  
    res.json(topProducts);
  };
  

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({ 
            where: { id: Number(id) },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(product);
    }catch (error) {
        console.error('Get product by ID error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, description, price, quantity, article, categoryId, isTop } = req.body;
    const image = req.file?.filename || '';
  
    const isTopBool = isTop === 'true' || isTop === true;
  
    try {
      const product = await prisma.product.create({
        data: {
          name,
          price: parseFloat(price),
          description,
          image,
          quantity,
          article,
          categoryId: Number(categoryId),
          isTop: isTopBool,
        },
      });
      res.status(201).json(product);
    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, quantity, article, categoryId, isTop } = req.body;
    const file = req.file;
  
    const isTopBool = isTop === 'true' || isTop === true;
  
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          price: parseFloat(price),
          quantity,
          article,
          isTop: isTopBool,
          ...(categoryId !== undefined && { categoryId: Number(categoryId) }),
          ...(file && { image: file.filename }),
        },
      });
  
      res.json(updatedProduct);
    } catch (error) {
      console.error('Update product error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({ where: { id: Number(id) } });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        await prisma.product.delete({ where: { id: Number(id) } });
        res.json({ message: 'Product deleted successfully' });
    }catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};