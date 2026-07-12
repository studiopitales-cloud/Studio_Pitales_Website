import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

try {
  console.log('📍 Loading production site...');
  await page.goto('https://www.studiopitales.co.il', { waitUntil: 'networkidle2', timeout: 30000 });
  console.log('✅ Loaded\n');

  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

  // Get initial state
  const initialDataLayer = await page.evaluate(() => {
    return (window.dataLayer || []).map((item, idx) => {
      if (Array.isArray(item)) {
        return `[${idx}] Array: [${item[0]}, ${item[1]}]`;
      } else if (typeof item === 'object') {
        return `[${idx}] Object: ${JSON.stringify(item).substring(0, 100)}`;
      }
      return `[${idx}] ${typeof item}`;
    });
  });

  console.log('📊 Initial dataLayer (first 8 entries):');
  initialDataLayer.slice(0, 8).forEach(item => console.log(`   ${item}`));

  // Click book button and capture what happens
  console.log('\n🔍 Clicking book lesson button...\n');

  await page.evaluate(() => {
    // Log when click happens
    console.log('=== CLICK EVENT START ===');

    const buttons = Array.from(document.querySelectorAll('a, button'));
    const bookBtn = buttons.find(b => b.textContent.includes('תיאום שיעור היכרות'));

    if (bookBtn) {
      console.log('Found button, clicking...');
      bookBtn.click();
    } else {
      console.log('Button NOT found');
    }
  });

  // Wait for any async operations
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1500)));

  // Get final state
  const finalDataLayer = await page.evaluate(() => {
    return (window.dataLayer || []).map((item, idx) => {
      if (Array.isArray(item)) {
        return `[${idx}] Array: [${item[0]}, ${item[1]}]`;
      } else if (typeof item === 'object') {
        return `[${idx}] Object: ${JSON.stringify(item).substring(0, 100)}`;
      }
      return `[${idx}] ${typeof item}`;
    });
  });

  console.log('📊 Final dataLayer (showing all):');
  finalDataLayer.forEach(item => console.log(`   ${item}`));

  // Count events
  const openLeadFormCount = finalDataLayer.filter(item => item.includes('open_lead_form')).length;
  const generateLeadCount = finalDataLayer.filter(item => item.includes('generate_lead')).length;

  console.log(`\n🎯 Results:`);
  console.log(`   - open_lead_form events: ${openLeadFormCount}`);
  console.log(`   - generate_lead events: ${generateLeadCount}`);
  console.log(`   - Total events in dataLayer: ${finalDataLayer.length}`);

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
