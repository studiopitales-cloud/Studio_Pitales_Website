import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Scroll to Levels section
  await page.evaluate(() => {
    const section = Array.from(document.querySelectorAll('section')).find(s => 
      s.textContent?.includes('השיעורים')
    );
    if (section) section.scrollIntoView();
  });
  
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));
  const screenshotDir = 'temporary screenshots';
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
  
  await page.screenshot({ path: path.join(screenshotDir, 'screenshot-levels-desktop.png'), fullPage: false });
  
  // Mobile
  await page.setViewport({ width: 375, height: 812 });
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  
  await page.evaluate(() => {
    const section = Array.from(document.querySelectorAll('section')).find(s => 
      s.textContent?.includes('השיעורים')
    );
    if (section) section.scrollIntoView();
  });
  
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));
  await page.screenshot({ path: path.join(screenshotDir, 'screenshot-levels-mobile.png'), fullPage: false });
  
  await browser.close();
  console.log('Screenshots saved');
})();
