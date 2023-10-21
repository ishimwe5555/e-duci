import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/', async (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

router.get('/style.css', (req, res) => {
  res.sendFile(path.resolve('public/css/style.css'));
});

export default router;
