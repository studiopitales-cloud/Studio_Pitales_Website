import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Get Levels section and screenshot it
  const levelsRect = await page.evaluate(() => {
    const section = document.querySelector('section#levels') || Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('השיעורים'));
    if (section) {
      const rect = section.getBoundingClientRect();
      return { top: rect.top, left: 0, width: window.innerWidth, height: rect.height };
    }
    return null;
  });
  
  if (levelsRect) {
    await page.screenshot({ 
      path: 'temporary screenshots/levels-focused.png',
      clip: { x: 0, y: levelsRect.top, width: levelsRect.width, height: Math.min(levelsRect.height, 1500) }
    });
    console.log('Levels section screenshot saved');
  }
})();
