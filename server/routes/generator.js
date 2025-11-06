
import express from 'express';
import { generateImage } from '../controllers/generatorController.js';

const router = express.Router();

router.post('/generate', generateImage);

export default router;
