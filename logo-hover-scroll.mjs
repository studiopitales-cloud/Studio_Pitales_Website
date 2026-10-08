import puppeteer from 'puppeteer';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

// Scroll
await page.evaluate(() => window.scrollBy(0, 300));
await new Promise(r => setTimeout(r, 300));

// Hover over logo
const logo = await page.$('a[aria-label="Pitales Studio"]');
await logo?.hover();

await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: join(__dirname, 'temporary screenshots', 'screenshot-286-logo-hover-scroll.png'), fullPage: false });

await browser.close();
console.log('Screenshot saved');
