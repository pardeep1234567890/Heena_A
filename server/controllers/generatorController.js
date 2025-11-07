import axios from 'axios';

export const generateImage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    console.log('Generating image for prompt:', prompt);
    
    // Use Together.ai which has a generous free tier
    const enhancedPrompt = `henna mehndi design, ${prompt}, intricate patterns, beautiful hand art, detailed, high quality`;
    
    // Using Segmind's free API endpoint (no signup required)
    const response = await axios.post(
      'https://api.segmind.com/v1/sd1.5-txt2img',
      {
        prompt: enhancedPrompt,
        negative_prompt: "blurry, low quality, bad anatomy, distorted",
        samples: 1,
        scheduler: "DDIM",
        num_inference_steps: 20,
        guidance_scale: 7.5,
        seed: Math.floor(Math.random() * 1000000),
        img_width: 512,
        img_height: 512,
        base64: false
      },
      {
        headers: {
          'x-api-key': 'free' // Segmind offers free tier
        },
        responseType: 'arraybuffer',
        timeout: 60000,
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
