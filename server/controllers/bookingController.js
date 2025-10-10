
import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  const { name, phone, eventType, eventDate, location, preferences, referenceImage } = req.body;

  try {
    const newBooking = new Booking({
      name,
      phone,
      eventType,
      eventDate,
      location,
      preferences,
      referenceImage
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