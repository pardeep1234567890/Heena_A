import axios from 'axios';

export const generateImage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      { inputs: prompt },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    res.set('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    console.error('Error generating image:', error.message);
    res.status(500).json({ error: 'Failed to generate image' });
  }
};
