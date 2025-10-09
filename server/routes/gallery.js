
import express from 'express';
import { getGalleryImages, addGalleryImage } from '../controllers/galleryController.js';

const router = express.Router();

router.get('/', getGalleryImages);
router.post('/', addGalleryImage);

export default router;
