

import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/booking.js';
import galleryRoutes from './routes/gallery.js';
import userRoutes from './routes/user.js';
import testimonialRoutes from './routes/testimonial.js';
import generatorRoutes from './routes/generator.js';

// Import passport config after dotenv is loaded
await import('./config/passport.js');

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api', generatorRoutes);

// MongoDB connection with better error handling for serverless
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    cachedDb = connection;
    console.log('MongoDB connected');
    return connection;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// Connect to database
connectDB();

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running',
    mongooseState: mongoose.connection.readyState,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
