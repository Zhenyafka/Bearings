import { Router } from 'express';
import { login } from '../controllers/authorizationController';

const router = Router();

router.post('/', login);

export default router;