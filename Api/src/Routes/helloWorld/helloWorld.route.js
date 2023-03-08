import express from 'express';

const router = express.Router();

router.get('/', async(req, res) => {
    return res.status(200).send('hello world')
}) 

export default router;