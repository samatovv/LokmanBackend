import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import { createService, deleteService, getServiceById, getServices, updateService } from "../controllers/servicesController";

const router = Router();

router.post('/', authenticateToken, createService);
router.get('/', getServices);
router.get('/:id', getServiceById);
router.delete('/:id', authenticateToken, deleteService);
router.put('/:id', authenticateToken, updateService);

export default router;