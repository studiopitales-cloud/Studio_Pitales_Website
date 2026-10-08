import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

// Scroll to AboutUs section
await page.evaluate(() => {
  const section = document.querySelector('[id="about-us"]') || 
                  document.evaluate("//div[contains(text(), 'שגרת אימונים')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

await page.waitForTimeout(2000);

const filename = `./temporary screenshots/screenshot-aboutus.png`;
await page.screenshot({ path: filename, fullPage: false, type: 'png' });

console.log(`Screenshot saved: ${filename}`);
await browser.close();
