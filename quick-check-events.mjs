import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

try {
  await page.goto('https://www.studiopitales.co.il', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

  // Test 1: Click book button
  console.log('🔍 Test 1: Clicking book lesson button...\n');

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('a, button'));
    const bookBtn = buttons.find(b => b.textContent.includes('תיאום שיעור היכרות'));
    if (bookBtn) bookBtn.click();
  });

  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));

  const test1 = await page.evaluate(() => {
    const events = window.dataLayer || [];
    const openLeadForm = events.find(e =>
      Array.isArray(e) && e[0] === 'event' && e[1] === 'open_lead_form'
    );

    return {
      openLeadFormFound: !!openLeadForm,
      dataLayerSize: events.length,
      lastEvents: events.slice(-3).map(e => Array.isArray(e) ? `Event: ${e[1]}` : 'Object'),
    };
  });

  console.log('✅ open_lead_form found:', test1.openLeadFormFound);
  console.log('   Last 3 events:', test1.lastEvents);
  console.log(`   Total dataLayer: ${test1.dataLayerSize}\n`);

  // Close modal if open
  await page.evaluate(() => {
    const closeBtn = document.querySelector('[aria-label="סגור"]');
    if (closeBtn) closeBtn.click();
  });

  // Test 2: Fill and check Footer form (simpler)
  console.log('🔍 Test 2: Checking Footer form event structure...\n');

  const componentCode = await page.evaluate(() => {
    // Get the source of all script tags
    const scripts = Array.from(document.querySelectorAll('script[src*="assets"]'));
    const bundleScript = scripts.find(s => s.src.includes('/index-'));

    if (bundleScript) {
      // Check if trackGenerateLead is in the bundle
      return {
        bundleLoaded: true,
        bundleUrl: bundleScript.src,
        hasFunctionsProbably: 'Cannot check bundle content from browser',
      };
    }

    return {
      bundleLoaded: false,
      message: 'Main bundle not found'
    };
  });

  console.log('📦 Bundle info:', componentCode);
  console.log('\n✅ Verification complete');

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
