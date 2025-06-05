import { Router } from 'express';
import { getProductAnalytics } from '../controllers/analyticsController';

const router = Router();

router.get('/products', getProductAnalytics);

export default router;
