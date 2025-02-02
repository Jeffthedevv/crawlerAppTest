// For more information, see https://crawlee.dev/
const { PlaywrightCrawler } = require('crawlee');

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.

async function startCrawler() {

  const crawler = new PlaywrightCrawler({
    async requestHandler({ request, page, log, pushData }) {
        const url = request.loadedUrl;
        const title = await page.title();

        log.info(`Scraping data from: ${url}`);

        // Extract each letter's data
        const letterData = await page.$$eval('.views-row', (rows) => {
            return rows.map(row => {
                const title = row.querySelector('.field-content h3')?.innerText.trim();
                const number = row.querySelector('.field-content .field-item')?.innerText.trim(); // Letter number
                const dateText = row.querySelector('.field-content .date')?.innerText.trim(); // Publication date
                const content = row.querySelector('.field-content .field-item')?.innerText.trim(); // Content

                // Format the date
                const date = new Date(dateText);

                return { title, number, date, content };
            });
        });

    

        // Optionally push the data into the crawlee dataset storage
        await pushData(letterData);
      },
        maxRequestsPerCrawl: 100,   // Optional: limit to 100 pages or letters
        headless: true,             // Use headless mode for crawling
    });

    // Run the crawler on the OSHA URL
    await crawler.run(['https://www.osha.gov/laws-regs/standardinterpretations/publicationdate']);     // Use headless mode for crawling
}

startCrawler().catch(console.error)

module.export = startCrawler; 