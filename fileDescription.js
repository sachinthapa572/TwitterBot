import axios from 'axios';
import 'dotenv/config';
import fs from 'fs/promises';

const fileDescription = async (filePath) => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('API key is missing');
    process.exit(1);
  }

  try {
    const image = await fs.readFile(filePath);
    const imageData = image.toString('base64');

    const response = await axios.post(
      'https://api.openai.com/v1/images/classifications', // Endpoint for image classification
      {
        model: 'image-alpha-001', // You might need to check the specific model available
        image: `data:image/jpeg;base64,${imageData}`,
        labels: ['label'], // Example: You might need to specify labels or categories for the image
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Handle the response
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};

fileDescription('./assets/images/food_1720845266287.jpg');
