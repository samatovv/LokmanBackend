import prisma from '../prisma/client';

export const getCategories = async (req: any, res: any) => {
    try {
        const { popular } = req.query;

        const categories = await prisma.category.findMany({
            where: typeof popular !== 'undefined'
                ? { popular: popular === 'true' }
                : undefined,
            include: {
                subcategories: true
            }
        });

        res.json(categories);
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getCategoryById = async (req: any, res: any) => {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
        where: { id: Number(id) },
    });

    if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }

    res.json(category);
};

export const createCategory = async (req: any, res: any) => {
    const { name, popular } = req.body;
    const image = req.file?.filename || '';

    const popularBool = popular === 'true' || popular === true;

    const category = await prisma.category.create({
        data: {
            name,
            popular: popularBool,
            image,
        },
    });

    res.json(category);
};

export const updateCategory = async (req: any, res: any) => {
    const { id } = req.params;
    const { name, popular } = req.body;
    const file = req.file;

    const popularBool = popular === 'true' || popular === true;

    const category = await prisma.category.update({
        where: { id: Number(id) },
        data: {
            name,
            popular: popularBool,
            ...(file && { image: file.filename }),
        },
    });

    res.json(category);
};

export const deleteCategory = async (req: any, res: any) => {
    const { id } = req.params;

    const category = await prisma.category.delete({
        where: { id: Number(id) },
    });

    res.json(category);
};

export const createSubCategory = async (req: any, res: any) => {
    const { name, parentId } = req.body;
    const image = req.file?.filename || '';
  
    try {
      const subcategory = await prisma.category.create({
        data: {
          name,
          image,
          parentId: Number(parentId),
          popular: false,
        },
      });
  
      res.json(subcategory);
    } catch (err) {
      console.error('Create subcategory error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

export const updateSubCategory = async (req: any, res: any) => {
    const { id } = req.params;
    const { name } = req.body;
    const file = req.file;
  
    try {
      const subcategory = await prisma.category.update({
        where: { id: Number(id) },
        data: {
          name,
          ...(file && { image: file.filename }),
        },
      });
  
      res.json(subcategory);
    } catch (err) {
      console.error('Update subcategory error:', err);
      res.status(500).json({ message: 'Server error' });
    }
}
  
  export const getSubCategories = async (req: any, res: any) => {
    const { parentId } = req.query;
  
    try {
      const subcategories = await prisma.category.findMany({
        where: {
          parentId: Number(parentId),
        },
      });
  
      res.json(subcategories);
    } catch (err) {
      console.error('Get subcategories error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  