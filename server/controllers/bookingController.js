
import Booking from '../models/booking.js';
import cloudinary from 'cloudinary';

export const createBooking = async (req, res) => {
  const { name, phone, eventType, eventDate, location, preferences } = req.body;
  const file = req.file;
  let referenceImageUrl = null;

  try {
    if (file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      });
      referenceImageUrl = result.secure_url;
    }

    const newBooking = new Booking({
      name,
      phone,
      eventType,
      eventDate,
      location,
      preferences,
      referenceImage: referenceImageUrl
    });

    const booking = await newBooking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};