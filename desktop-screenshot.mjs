import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();

// Set viewport to desktop size (1920x1080)
await page.setViewport({ width: 1920, height: 1080 });

await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

// Scroll to Levels section
await page.evaluate(() => {
  const section = document.querySelector('#levels');
  if (section) section.scrollIntoView({ behavior: 'auto', block: 'start' });
});

await page.waitForTimeout(1500);

const filename = `./temporary screenshots/screenshot-levels-desktop.png`;
await page.screenshot({ path: filename, fullPage: false, type: 'png' });

console.log(`Desktop screenshot saved: ${filename}`);
await browser.close();
