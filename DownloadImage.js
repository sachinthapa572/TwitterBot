import axios from 'axios';
import fs from 'fs/promises'; // Use fs/promises for async/await methods
import path from 'path';
import 'dotenv/config';

export const downloadImage = async () => {
  const options = ['nature', 'city', 'technology', 'food', 'abstract'];

  const category = options[Math.floor(Math.random() * options.length)];

  const filename = `${category}_${Date.now()}.jpg`;
  const dirname = path.resolve('./assets/images');
  const apiKey = process.env.API_IMAGE;
  const filePath = path.join(dirname, filename);

  if (!apiKey) {
    console.error('API key is missing');
    process.exit(1); // Exit the process if API key is not available
  }

  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/randomimage', {
      headers: {
        'X-Api-Key': process.env.API_IMAGE,
        Accept: 'image/jpg',
      },
      params: {
        category: category,
      },
      responseType: 'arraybuffer',
    });

    await fs.mkdir(dirname, { recursive: true });

    await fs.writeFile(filePath, response.data);

    console.log('Image saved to', filePath);
    return filename;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return null;
  }
};
