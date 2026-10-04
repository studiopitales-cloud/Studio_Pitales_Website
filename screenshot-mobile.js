const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/blog/pilates-for-athletes', { waitUntil: 'networkidle2' });
  await page.screenshot({ 
    path: './temporary screenshots/screenshot-mobile-390.png',
    fullPage: true
  });
  await browser.close();
  console.log('Mobile screenshot saved');
})();
