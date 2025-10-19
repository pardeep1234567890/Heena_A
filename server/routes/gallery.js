import express from 'express';
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getGalleryImages);
router.post('/', upload.single('image'), addGalleryImage);
router.delete('/:id', deleteGalleryImage);

export default router;
