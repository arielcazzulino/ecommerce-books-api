import { Router } from 'express';
import registerUser from './Users/Registration/registerUser.route.js';
import login from './Users/Login/login.route.js';
import updateUserInfo from './Users/Update/Update.route.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.put('/users/:userId', updateUserInfo);

export default router;