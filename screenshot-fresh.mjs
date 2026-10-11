import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Clear cache
  const client = await page.target().createCDPSession();
  await client.send('Network.clearBrowserCookies');
  await client.send('Network.clearBrowserCache');
  
  await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'temporary screenshots/blog-fresh.png', fullPage: true });
  await browser.close();
  console.log('Fresh blog screenshot saved');
})();
