import { Router } from 'express';
import { getBearings, getBrands, getBearingsByPrice, getBearingsByBrand } from '../controllers/bearingsController';
import { authenticateJWT } from '../middleware/authMiddleware';
const router = Router();

router.get('/bearings', authenticateJWT, getBearings);
router.get('/brands', authenticateJWT, getBrands);
router.get('/bearings/sorted/price', authenticateJWT, getBearingsByPrice);
router.get('/bearings/:brand', authenticateJWT, getBearingsByBrand);

export default router;