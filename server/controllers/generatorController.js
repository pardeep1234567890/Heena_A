import axios from 'axios';

export const generateImage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Check if API key exists
  if (!process.env.HUGGINGFACE_API_KEY) {
    console.error('HUGGINGFACE_API_KEY is not set');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    console.log('Generating image for prompt:', prompt);
    
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      { inputs: prompt },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
        timeout: 60000, // 60 second timeout
      }
    );

    console.log('Image generated successfully');
    res.set('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    console.error('Error generating image:', error.message);
    
    // Better error handling
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data?.toString());
      
      // Check if model is loading
      if (error.response.status === 503) {
        return res.status(503).json({ 
          error: 'Model is loading, please try again in a few moments',
          estimated_time: error.response.data?.estimated_time 
        });
      }
      
      return res.status(error.response.status).json({ 
        error: 'Failed to generate image',
        details: error.response.data?.toString() || error.message
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to generate image',
      details: error.message 
    });
  }
};
