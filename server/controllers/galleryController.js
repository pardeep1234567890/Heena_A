import Gallery from '../models/gallery.js';
import cloudinary from 'cloudinary';

export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (err) {
    console.error('Error getting gallery images:', err);
    res.status(500).json({
      error: 'Server error',
      message: err.message
    });
  }
};

export const addGalleryImage = async (req, res) => {
  const { title, category } = req.body;
  const file = req.file;

  try {
    console.log('Upload request received:', { title, category, hasFile: !!file });
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    if (!title || !category) {
      return res.status(400).json({ error: 'Title and category are required.' });
    }

    // Check Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary configuration missing');
      return res.status(500).json({ error: 'Cloudinary configuration missing' });
    }

    // Configure Cloudinary (moved here to ensure env vars are loaded)
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log('Uploading to Cloudinary...');
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload successful:', result.secure_url);
            resolve(result);
          }
        }
      );
      uploadStream.end(file.buffer);
    });

    const newImage = new Gallery({
      title,
      category,
      imageUrl: result.secure_url,
    });

    const image = await newImage.save();
    console.log('Image saved to database:', image._id);
    res.json(image);
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({
      error: 'Server error',
      message: err.message
    });
  }
};

export const deleteGalleryImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Gallery.findById(id);
    if (!image) {
      return res.status(404).json({ msg: 'Image not found' });
    }

    // Configure Cloudinary
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const publicId = image.imageUrl.split('/').pop().split('.')[0];
    console.log(`Attempting to delete image from Cloudinary with publicId: ${publicId}`);

    await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error('Cloudinary deletion error:', error);
          return reject(error);
        }
        console.log('Cloudinary deletion result:', result);
        resolve(result);
      });
    });

    await Gallery.findByIdAndDelete(id);

    res.json({ msg: 'Image deleted' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({
      error: 'Server error',
      message: err.message
    });
  }
};