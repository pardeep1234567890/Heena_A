
import Gallery from '../models/Gallery.js';

export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const addGalleryImage = async (req, res) => {
  const { title, imageUrl } = req.body;

  try {
    const newImage = new Gallery({
      title,
      imageUrl
    });

    const image = await newImage.save();
    res.json(image);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};