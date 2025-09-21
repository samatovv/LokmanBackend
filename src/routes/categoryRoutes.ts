import { Router } from 'express';
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    createSubCategory,
    updateSubCategory,
    getSubCategories
} from '../controllers/categoryController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/multer';

const router = Router();

router.post('/', authenticateToken, upload.single('image'), createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', authenticateToken, upload.single('image'), updateCategory);
router.delete('/:id', authenticateToken, deleteCategory);

router.post('/sub', authenticateToken, upload.single('image'), createSubCategory);
router.get('/sub/:id', getSubCategories);
router.put('/sub/:id', authenticateToken, upload.single('image'), updateSubCategory);
router.delete('/sub/:id', authenticateToken, deleteCategory);

export default router;