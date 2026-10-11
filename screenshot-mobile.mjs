import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  await page.evaluate(() => {
    const section = document.querySelector('section#levels') || Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('השיעורים'));
    if (section) section.scrollIntoView();
  });
  
  await page.screenshot({ path: 'temporary screenshots/mobile-reformer.png', fullPage: false });
  console.log('Mobile screenshot saved');
})();
