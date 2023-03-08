import { Router } from 'express';
import registerUser from './Users/Registration/registerUser.route.js';
import login from './Users/Login/login.js';

const router = Router();

router.use('/register', registerUser);
router.use('/login', login);

export default router;