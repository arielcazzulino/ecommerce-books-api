import { Router } from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';
import registerUser from './Users/Registration/registerUser.route.js';
import login from './Users/Login/login.route.js';
import updateUserInfo from './Users/UpdateInfo/Update.route.js';
import getUserInfo from './Users/GetInfo/GetInfo.route.js';
import addProducts from './Inventory/addProducts.route.js';
import updateProductStock from './Inventory/updateStock.route.js';

const router = Router();

//user
router.post('/register', registerUser);
router.post('/login', login);
router.put('/users/:userId', authMiddleware, updateUserInfo);
router.get('/users/:userId', authMiddleware, getUserInfo);

//inventory
router.post('/add', authMiddleware, addProducts);
router.put('/update/:id', authMiddleware, updateProductStock);

export default router;
