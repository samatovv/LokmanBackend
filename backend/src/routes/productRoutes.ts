import { Router } from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getTopProductsByCategory
} from '../controllers/productController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/multer';

const router = Router();

router.post('/', authenticateToken, upload.single('image'), createProduct);
router.get('/', getProducts);
router.get('/top/:id', getTopProductsByCategory);
router.get('/:id', getProductById);
router.put('/:id', authenticateToken, upload.single('image'), updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

export default router;