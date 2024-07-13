import axios from 'axios';
import 'dotenv/config';

export const getQuote = async () => {
  const apiKey = process.env.API_IMAGE;

  // Ensure the API key is present
  if (!apiKey) {
    console.error('API key is missing');
    process.exit(1); // Exit the process if API key is not available
  }

  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/jokes', {
      headers: {
        'X-Api-Key': apiKey,
      },
    });
    return response.data[0].joke;
    // console.log(response.data[0].joke);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return null; // Return null in case of error
  }
};
