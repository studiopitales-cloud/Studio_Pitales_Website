import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

// Track network requests
const apiRequests = [];
page.on('response', (response) => {
  const url = response.url();
  if (url.includes('/api/create-lead') || url.includes('create-lead')) {
    apiRequests.push({
      url: url,
      status: response.status(),
      statusText: response.statusText(),
    });
  }
});

try {
  console.log('📍 Loading production site...');
  await page.goto('https://www.studiopitales.co.il', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));
  console.log('✅ Loaded\n');

  console.log('📍 Opening ContactSheet...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('a, button'));
    const bookBtn = buttons.find(b => b.textContent.includes('תיאום שיעור היכרות'));
    if (bookBtn) bookBtn.click();
  });

  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1500)));

  console.log('📍 Filling form...');
  await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input'));
    const lastInputs = inputs.slice(-2);
    if (lastInputs.length >= 2) {
      lastInputs[0].value = 'בדיקה טופס';
      lastInputs[0].dispatchEvent(new Event('input', { bubbles: true }));
      lastInputs[1].value = '0501234567';
      lastInputs[1].dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  console.log('📍 Submitting form...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const submitBtn = buttons.find(b => b.textContent.includes('שלח'));
    if (submitBtn) submitBtn.click();
  });

  // Wait for network request
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));

  console.log('\n📊 API Requests captured:');
  if (apiRequests.length > 0) {
    apiRequests.forEach(req => {
      console.log(`   - ${req.url}`);
      console.log(`     Status: ${req.status} ${req.statusText}`);
    });
  } else {
    console.log('   ❌ NO API REQUESTS TO /api/create-lead');
  }

  // Check console for errors
  const consoleMsgs = [];
  page.on('console', msg => {
    consoleMsgs.push(`[${msg.type()}] ${msg.text()}`);
  });

  // Log what happened
  const finalState = await page.evaluate(() => {
    return {
      gtagExists: typeof window.gtag !== 'undefined',
      trackGenerateLeadExists: typeof window.trackGenerateLead !== 'undefined',
      dataLayerSize: (window.dataLayer || []).length,
    };
  });

  console.log('\n📊 Final state:');
  console.log(`   - gtag exists: ${finalState.gtagExists}`);
  console.log(`   - trackGenerateLead exists: ${finalState.trackGenerateLeadExists}`);
  console.log(`   - dataLayer size: ${finalState.dataLayerSize}`);

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
