
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  preferences: {
    type: String
  },
  referenceImage: {
    type: String
  },
  status: {
    type: String,
    default: 'pending'
  }
});

export default mongoose.model('Booking', BookingSchema);