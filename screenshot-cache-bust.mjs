import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Disable cache
  await page.setCacheEnabled(false);
  
  // Clear cookies/cache
  const client = await page.target().createCDPSession();
  await client.send('Network.clearBrowserCache');
  
  await page.goto('http://localhost:3000/blog?t=' + Date.now(), { waitUntil: 'networkidle0' });
  
  // Check what images are in the DOM
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.src,
      alt: img.alt,
      complete: img.complete,
      naturalWidth: img.naturalWidth
    }));
  });
  
  console.log('Images found:', JSON.stringify(images, null, 2));
  
  await page.screenshot({ path: 'temporary screenshots/blog-no-cache.png', fullPage: true });
  await browser.close();
})();
