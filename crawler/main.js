// For more information, see https://crawlee.dev/
const { PlaywrightCrawler } = require('crawlee');

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.

async function startCrawler() {
  
  const crawler = new PlaywrightCrawler({

    async requestHandler({  request, page, enqueueLinks, log, pushData }) {
        const url = request.loadedUrl;
        const title = await page.title();

        log.info(`Scraping data from: ${url}`);


        // Extract each pages data 
        const pagesData = await page.$$eval('.views-row', (rows) => {
            return rows.map(row => {
                const title = row.querySelector('.field-content h3')?.innerText.trim();
                const number = row.querySelector('.field-content .field-item')?.innerText.trim(); // Letter number
                const dateText = row.querySelector('.field-content .date')?.innerText.trim(); // Publication date
                const content = row.querySelector('.field-content .field-item')?.innerText.trim(); // Content

                // Format the date
                const date = new Date(dateText);

                log.info("Crawled Page Data Title: ", title, "\nnumber: ", number, "\ndateText: ", dateText, "\ncontent: ", content)

                return { title, number, date, content };
            });
        });

        // log.info("Page Crawled: ", title, "\nContent", pagesData.data);

        // Save each page data to MongoDB
        // for (const page of pagesData) {
        //     if (page.title && page.number && page.date && page.content) {
        //         try {
        //             await page.create(page); // Save each letter as a document
        //             log.info(`Saved letter ${page.number} to MongoDB`);
        //         } catch (error) {
        //             log.error(`Failed to save letter ${page.number}: ${error}`);
        //         }
        //     }
        // }

        // Optionally push the data into the crawlee dataset storage
        // await pushData(pagesData);

        await enqueueLinks({
          selector: '.view-content a', // The class selector I used to target the publications wrapper element links. 
          baseUrl: url, // the base url for relative paths following the selector link.
        });

      },
        maxRequestsPerCrawl: 100,   // Optional: limit to 100 pages or letters
        headless: false,             // Use headless mode for crawling
    });

    // Run the crawler on the OSHA URL
    await crawler.run(['https://www.osha.gov/laws-regs/standardinterpretations/publicationdate']);     // Use headless mode for crawling
}

startCrawler().catch(console.error)

module.export = startCrawler; 