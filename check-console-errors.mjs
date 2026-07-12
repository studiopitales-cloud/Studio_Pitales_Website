import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

// Capture console messages and errors
const consoleLogs = [];
const consoleErrors = [];

page.on('console', (msg) => {
  const text = msg.text();
  if (msg.type() === 'error') {
    consoleErrors.push(text);
  } else {
    consoleLogs.push(text);
  }
});

page.on('pageerror', err => {
  consoleErrors.push(`Page Error: ${err.message}`);
});

try {
  console.log('📍 Loading site...');
  await page.goto('https://www.studiopitales.co.il', { waitUntil: 'networkidle2', timeout: 30000 });
  console.log('✅ Site loaded\n');

  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

  // Check if functions exist
  const functionsExist = await page.evaluate(() => {
    return {
      hasTrackOpenLeadForm: typeof window.trackOpenLeadForm === 'function',
      hasTrackGenerateLead: typeof window.trackGenerateLead === 'function',
      hasGtag: typeof window.gtag === 'function',
      hasDataLayer: Array.isArray(window.dataLayer),
    };
  });

  console.log('🔍 Functions available on window:');
  console.log(`   - trackOpenLeadForm: ${functionsExist.hasTrackOpenLeadForm ? '✅' : '❌'}`);
  console.log(`   - trackGenerateLead: ${functionsExist.hasTrackGenerateLead ? '✅' : '❌'}`);
  console.log(`   - gtag: ${functionsExist.hasGtag ? '✅' : '❌'}`);
  console.log(`   - dataLayer: ${functionsExist.hasDataLayer ? '✅' : '❌'}\n`);

  // Manually test the function
  console.log('🧪 Testing trackOpenLeadForm function directly...');

  const beforeCount = await page.evaluate(() => window.dataLayer?.length || 0);

  await page.evaluate(() => {
    if (typeof window.trackOpenLeadForm === 'function') {
      window.trackOpenLeadForm();
    }
  });

  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));

  const afterCount = await page.evaluate(() => window.dataLayer?.length || 0);
  const lastEvent = await page.evaluate(() => {
    const events = window.dataLayer || [];
    return events[events.length - 1];
  });

  console.log(`   - Before: ${beforeCount} events`);
  console.log(`   - After: ${afterCount} events`);
  console.log(`   - Last event:`, lastEvent, '\n');

  // Check console for errors
  console.log('📋 Console messages:');
  if (consoleErrors.length > 0) {
    console.log(`\n❌ ERRORS (${consoleErrors.length}):`);
    consoleErrors.forEach(e => console.log(`   - ${e}`));
  }

  if (consoleLogs.length > 5) {
    console.log(`\n✅ Console logs (${consoleLogs.length}) - showing last 5:`);
    consoleLogs.slice(-5).forEach(log => console.log(`   - ${log}`));
  }

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
