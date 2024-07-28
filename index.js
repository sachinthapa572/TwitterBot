import dotenv from 'dotenv';
dotenv.config();
import { CronJob } from 'cron';
import { twitterClient } from './twitterClient.js';
import { downloadImage } from './DownloadImage.js';
import fs from 'fs/promises';
import { getQuote } from './quote.js';

const tweet = async () => {
  try {
    //! download image
    const filename = await downloadImage();
    if (!filename) {
      throw new Error('Failed to download image. No filename returned.');
    }
    //!  jokes
    const joke = await getQuote();
    if (!joke) {
      throw new Error('Failed to get a joke. No joke returned.');
    }

    const filePath = `./assets/images/${filename}`;

    //!: Add a description to the tweet
    // const fileDescription = await fileDescription(filePath);
    // if (!fileDescription) {
    //   throw new Error('Failed to get file description. No description returned.');
    // }

    const mediaId = await twitterClient.v1.uploadMedia(filePath);
    console.log(mediaId);
    await twitterClient.v2.tweet({
      text: joke,
      media: {
        media_ids: [mediaId],
      },
    });
    console.log('Tweeted successfully with media:', filePath);
    //delete the image after tweeting

    await fs.unlink(filePath);
    console.log('Deleted the image:', filePath);
  } catch (error) {
    console.error('Failed to tweet:', error);
  }
};

tweet();

// https://crontab.guru/ for cron job scheduling

// const cronJob = new CronJob('30 * * * *', async () => {
//   try {
//     await tweet(); // Call the tweet function
//   } catch (error) {
//     console.error('Failed to execute cron job:', error);
//   }
// });

// cronJob.start();
