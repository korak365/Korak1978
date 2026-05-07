# Niche Directory Scraper

This Actor scrapes industry-specific directories (e.g., "Top Dentists in London") to extract structured contact information about businesses, professionals, or organizations.

## Features
- Scrapes directories based on user-defined CSS selectors.
- Automatically handles pagination to retrieve all listings.
- Outputs structured data, including:
  - Name
  - Location
  - Phone
  - Email
  - Website

## Input Configuration
- **startUrls**: Array of directory URLs to scrape.
- **nameSelector**: CSS selector for extracting names.
- **locationSelector**: CSS selector for locations or addresses.
- **phoneSelector**: CSS selector for phone numbers.
- **emailSelector**: CSS selector for email addresses.
- **websiteSelector**: CSS selector for websites.
- **paginationSelector**: CSS selector for pagination links.

## Output Example
| Name                | Location              | Phone         | Email                 | Website                  |
|---------------------|-----------------------|---------------|-----------------------|--------------------------|
| Dr. John Doe        | London, UK           | +44 123 4567  | john@example.com      | https://example.com/john|
| Smile Dental Clinic | Birmingham, UK       | +44 765 4321  | contact@smileclinic.uk| https://smileclinic.uk   |

## Example Use Cases
- Lead generation for sales/marketing teams targeting specific industries.
- Building curated directories for local businesses or professionals.
- Data enrichment for industry-specific SEO campaigns.

## Example Input
```json
{
    "startUrls": ["https://example.com/top-dentists-in-london"],
    "nameSelector": ".business-name",
    "locationSelector": ".business-location",
    "phoneSelector": ".business-phone",
    "emailSelector": ".business-email",
    "websiteSelector": ".business-website",
    "paginationSelector": ".pagination-next"
}