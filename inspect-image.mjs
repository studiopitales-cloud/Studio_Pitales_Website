import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Get image information
  const imageInfo = await page.evaluate(() => {
    // Desktop image
    const desktopImg = document.querySelector('img[src="/reformer-studio-1280.jpg"]');
    if (desktopImg) {
      return {
        src: desktopImg.src,
        naturalWidth: desktopImg.naturalWidth,
        naturalHeight: desktopImg.naturalHeight,
        displayWidth: desktopImg.offsetWidth,
        displayHeight: desktopImg.offsetHeight,
        computedStyle: {
          width: window.getComputedStyle(desktopImg).width,
          height: window.getComputedStyle(desktopImg).height,
          objectFit: window.getComputedStyle(desktopImg).objectFit,
        }
      };
    }
    return null;
  });
  
  console.log('Image Info:', JSON.stringify(imageInfo, null, 2));
  
  // Check network requests
  const requests = [];
  page.on('response', response => {
    if (response.url().includes('reformer-studio')) {
      requests.push({
        url: response.url(),
        status: response.status(),
        contentLength: response.headers()['content-length']
      });
    }
  });
  
  console.log('Network Requests:', requests);
  
  await browser.close();
})();
