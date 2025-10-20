
import express from 'express';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/bookingController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('referenceImage'), createBooking);
router.get('/', getBookings);
router.put('/:id', updateBookingStatus);

export default router;
