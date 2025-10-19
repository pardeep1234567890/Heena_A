import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
});

export default mongoose.model('Testimonial', TestimonialSchema);
