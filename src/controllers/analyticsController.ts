import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { subDays, format } from 'date-fns';

export const getProductAnalytics = async (req: Request, res: Response) => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newProductsCount = await prisma.product.count({
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
    });

    const allProducts = await prisma.product.findMany();

    const totalQuantity = allProducts.reduce(
      (sum, p) => sum + parseInt(p.quantity || '0'),
      0
    );

    const totalValue = allProducts.reduce(
      (sum, p) => sum + (p.price !== null ? p.price * parseInt(p.quantity || '0') : 0),
      0
    );

    const mostExpensiveProduct = await prisma.product.findFirst({
      orderBy: { price: 'desc' },
    });

    const cheapestProduct = await prisma.product.findFirst({
      orderBy: { price: 'asc' },
    });

    const newestProduct = await prisma.product.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    const oldestProduct = await prisma.product.findFirst({
      orderBy: { createdAt: 'asc' },
    });

    const daysToCheck = 7;
    const today = new Date();

    const newProductsByDay = [];

    for (let i = daysToCheck - 1; i >= 0; i--) {
      const day = subDays(today, i);
      const dayStart = new Date(day);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);

      const count = await prisma.product.count({
        where: {
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
      });

      newProductsByDay.push({
        date: format(day, 'yyyy-MM-dd'),
        count,
      });
    }

    res.json({
      newProductsCount,
      totalQuantity,
      totalValue,
      mostExpensiveProduct,
      cheapestProduct,
      newestProduct,
      oldestProduct,
      newProductsByDay,
    });
  } catch (error) {
    console.error('[Product Analytics Error]', error);
    res.status(500).json({ message: 'Ошибка при получении аналитики по товарам' });
  }
};
