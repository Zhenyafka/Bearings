import { Router } from 'express';
import { auth } from '../controllers/authenticationController';

const router = Router();

router.post('/auth', auth);

export default router;