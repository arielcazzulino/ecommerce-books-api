import { Router } from 'express';
import registerUser from './Users/registerUser.route.js';

const router = Router();

router.use('/register', registerUser);

export default router;