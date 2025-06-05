import { Router } from 'express';

const router = Router();

import {
    createBanner,
    getBanners,
    getBannerById,
    updateBanner,
    deleteBanner,
} from '../controllers/bannerController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/multer';

router.post('/', authenticateToken, upload.single('image'), createBanner);
router.get('/', getBanners);
router.get('/:id', getBannerById);
router.put('/:id', authenticateToken, upload.single('image'), updateBanner);
router.delete('/:id', authenticateToken, deleteBanner);

export default router;