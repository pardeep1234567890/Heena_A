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
    
    // Using a smaller, faster model that works better with free tier
    const response = await axios.post(
      'https://router.huggingface.co/hf-inference/models/runwayml/stable-diffusion-v1-5',
      { 
        inputs: `henna mehndi design, ${prompt}, intricate patterns, beautiful hand art, detailed, high quality`,
        parameters: {
          negative_prompt: "blurry, low quality, bad anatomy"
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
        timeout: 120000, // 120 second timeout for image generation
      }
    );

    console.log('Image generated successfully');
    res.set('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    console.error('=== ERROR GENERATING IMAGE ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Better error handling
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
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
    
    console.error('No response from API');
    res.status(500).json({ 
      error: 'Failed to generate image',
      details: error.message 
    });
  }
};
