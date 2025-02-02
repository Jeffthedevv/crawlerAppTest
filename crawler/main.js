const { PlaywrightCrawler } = require('crawlee');

const Page = require('../models/page'); // Import Mongoose model

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.

async function startCrawler() {
  
  const crawler = new PlaywrightCrawler({

    async requestHandler({  request, page, enqueueLinks, log, pushData }) {
        const url = request.loadedUrl;
        log.info(`Scraping data from: ${url}`);

        const segments = url.split('/');
        const lastSegment = segments[segments.length - 1];  // Get the last segment of the URL


      // Step 1: If we are on a year-specific page (e.g., /publicationdate/2024)
      if (lastSegment.includes('-')) {

        const title = await page.title();
        const content = await page.locator('article').innerText();
        const numbers = await page.locator('.field--name-field-fr-standard-number').innerText();

        // console.log(`\nPage Title: ${String(title)}\nContent: ${content}\nNumbers: ${numbers}`);

        // Save the data to MongoDB
        const newPage = new Page({
          title: title,
          content: content,
          numbers: numbers,
        });
  
        try {
          await newPage.save(); // Save the page to MongoDB
          log.info(`Saved letter ${title} to MongoDB`);
        } catch (error) {
          log.error(`Failed to save letter ${title}: ${error}`);
        }

      } else {  // Step 2: If we are on an individual letter page

         // Extract the links to individual letter pages on the year-specific page
         await enqueueLinks({
          selector: '.view-field a', // Select links to individual letter pages
          baseUrl: 'https://www.osha.gov/laws-regs/standardinterpretations/publicationdate', // Ensure base URL is set correctly for relative links
        });

        const title = await page.title();
        const segments = url.split('/');
        const year = segments[segments.length - 1]; // Last segment of the URL
        const content = await page.locator('.view-standard-interpretations .view-content').innerText();
 
        // log.info(`\nPage Title: ${String(title)}\nYear: ${year}`);

        // Optionally push the data into the crawlee dataset storage
        // await pushData(pagesData);
        
       // Save the data to MongoDB
        const newPage = new Page({
          title: title,
          year: year,
          content: content,
          numbers: null
        });

        try {
          await newPage.save(); // Save the page to MongoDB
          log.info(`Saved page ${title} to MongoDB`);
        } catch (error) {
          log.error(`Failed to save page ${title}: ${error}`);
        }

      } //! End Conditional

        // Extract the links to individual letter pages on the year-specific page
        await enqueueLinks({
          selector: '.view-content a', // Select links to individual letter pages
          baseUrl: url, // Ensure base URL is set correctly for relative links
        });
      },
        // maxRequestsPerCrawl: 100,   // Optional: limit to 100 pages or letters
        headless: true,             // Use headless mode for crawling
    });

    // Run the crawler on the OSHA URL
    await crawler.run(['https://www.osha.gov/laws-regs/standardinterpretations/publicationdate']);     // Use headless mode for crawling
}

startCrawler().catch(console.error)

module.exports = startCrawler; 
