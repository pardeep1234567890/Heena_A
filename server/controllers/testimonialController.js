import Testimonial from '../models/testimonial.js';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    console.error('Error in getTestimonials:', err.message, err.stack);
    res.status(500).json({ 
      error: 'Server Error',
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Admin
export const createTestimonial = async (req, res) => {
  const { author, text, rating } = req.body;

  try {
    const newTestimonial = new Testimonial({
      author,
      text,
      rating
    });

    const testimonial = await newTestimonial.save();
    res.json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Admin
export const updateTestimonial = async (req, res) => {
  const { author, text, rating } = req.body;

  try {
    let testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }

    testimonial.author = author;
    testimonial.text = text;
    testimonial.rating = rating;

    testimonial = await testimonial.save();

    res.json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Admin
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ msg: 'Testimonial not found' });
    }

    await Testimonial.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Testimonial removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
