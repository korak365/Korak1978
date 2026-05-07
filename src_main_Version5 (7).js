import { Actor } from 'apify';
import { CheerioCrawler, Dataset } from 'crawlee';

await Actor.init();

// Load input parameters
const {
    startUrls = [],
    nameSelector = ".name, .listing-title, .business-name",
    locationSelector = ".location, .address",
    phoneSelector = ".phone, .contact-number",
    emailSelector = ".email, .contact-email",
    websiteSelector = ".website, .link",
    paginationSelector = ".pagination-next",
} = (await Actor.getInput()) ?? {};

// Initialize the crawler
const crawler = new CheerioCrawler({
    async requestHandler({ request, $, enqueueLinks, log }) {
        log.info(`Scraping: ${request.url}`);

        // Scrape all listings on the current page
        const listings = [];
        $(".listing-card, .business-item, .directory-item").each((_, el) => {
            const listing = $(el);

            // Extract fields using the provided selectors
            const name = listing.find(nameSelector).text().trim();
            const location = listing.find(locationSelector).text().trim();
            const phone = listing.find(phoneSelector).text().trim();
            const email = listing.find(emailSelector).text().trim();
            const website = listing.find(websiteSelector).attr('href') || '';

            listings.push({ name, location, phone, email, website });
        });

        log.info(`Found ${listings.length} listings on ${request.url}`);

        // Save to dataset
        await Dataset.pushData(listings);

        // Handle pagination
        const nextPage = $(paginationSelector).attr('href');
        if (nextPage) {
            const absUrl = new URL(nextPage, request.url).href;
            log.info(`Enqueuing next page: ${absUrl}`);
            await enqueueLinks({ urls: [absUrl] });
        }
    },
});

// Run the crawler
await crawler.run(startUrls);

await Actor.exit();