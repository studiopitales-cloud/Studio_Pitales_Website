import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const imageInfo = await page.evaluate(() => {
    const img = document.querySelector('img[src*="reformer-studio"]');
    if (img) {
      return {
        src: img.src,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        displayWidth: img.offsetWidth,
        displayHeight: img.offsetHeight,
      };
    }
    return null;
  });
  
  console.log('Desktop Image Loaded:');
  console.log(JSON.stringify(imageInfo, null, 2));
  
  // Mobile
  await page.setViewport({ width: 375, height: 812 });
  
  const mobileInfo = await page.evaluate(() => {
    const section = document.querySelector('[style*="reformer-studio"]');
    if (section) {
      const bg = window.getComputedStyle(section).backgroundImage;
      return { backgroundImage: bg };
    }
    return null;
  });
  
  console.log('\nMobile Background Image:');
  console.log(JSON.stringify(mobileInfo, null, 2));
  
  await browser.close();
})();
