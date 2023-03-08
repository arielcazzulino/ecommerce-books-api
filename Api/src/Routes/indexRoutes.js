import { Router } from 'express';
import registerUser from './Users/Registration/registerUser.route.js';
import login from './Users/Login/login.route.js';
import updateUserInfo from './Users/UpdateInfo/Update.route.js';
import getUserInfo from './Users/GetInfo/GetInfo.route.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.put('/users/:userId', updateUserInfo);
router.get('/users/:userId', getUserInfo);

export default router;