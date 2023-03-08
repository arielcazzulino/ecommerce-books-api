import { Router } from 'express';
import test from './helloWorld/helloWorld.route.js';

const router = Router();

router.use('/', test);

export default router;