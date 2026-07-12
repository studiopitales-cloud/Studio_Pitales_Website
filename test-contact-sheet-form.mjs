import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

try {
  console.log('📍 Loading production site...');
  await page.goto('https://www.studiopitales.co.il', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));
  console.log('✅ Loaded\n');

  console.log('📍 Clicking book lesson button to open ContactSheet...');

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('a, button'));
    const bookBtn = buttons.find(b => b.textContent.includes('תיאום שיעור היכרות'));
    if (bookBtn) bookBtn.click();
  });

  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1500)));
  console.log('✅ Modal should be open\n');

  console.log('📍 Finding and filling form in ContactSheet...');

  const formFilledResult = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input'));
    console.log(`Found ${inputs.length} inputs in modal`);

    // Get last 2 inputs (should be name and phone in the modal)
    const lastInputs = inputs.slice(-2);

    if (lastInputs.length >= 2) {
      // Assume first is name, second is phone
      lastInputs[0].value = 'בדיקה טופס';
      lastInputs[0].dispatchEvent(new Event('input', { bubbles: true }));

      lastInputs[1].value = '0501234567';
      lastInputs[1].dispatchEvent(new Event('input', { bubbles: true }));

      return { success: true, message: 'Form filled' };
    }

    return { success: false, message: 'Not enough inputs' };
  });

  console.log(`   ${formFilledResult.message}\n`);

  // Check dataLayer before submit
  const beforeDataLayer = await page.evaluate(() => {
    return (window.dataLayer || []).filter(e =>
      Array.isArray(e) && e[0] === 'event' && (e[1] === 'generate_lead' || e[1] === 'open_lead_form')
    ).map(e => e[1]);
  });

  console.log('📊 Before submit - tracked events:',  beforeDataLayer);

  console.log('\n📍 Submitting form...');

  // Get initial dataLayer length
  const initialLen = await page.evaluate(() => (window.dataLayer || []).length);

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const submitBtn = buttons.find(b => b.textContent.includes('שלח'));
    console.log(`Submit button found: ${!!submitBtn}`);
    if (submitBtn) submitBtn.click();
  });

  // Wait for submit
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));

  // Check dataLayer after submit
  const afterLen = await page.evaluate(() => (window.dataLayer || []).length);

  const afterDataLayer = await page.evaluate(() => {
    const events = window.dataLayer || [];
    const genLead = events.filter(e =>
      Array.isArray(e) && e[0] === 'event' && e[1] === 'generate_lead'
    );

    return {
      generateLeadCount: genLead.length,
      allGenerateLead: genLead,
      lastEvents: events.slice(-3).map(e => {
        if (Array.isArray(e)) return `[${e[0]}, ${e[1]}]`;
        return JSON.stringify(e).substring(0, 50);
      }),
    };
  });

  console.log('📊 After submit:');
  console.log(`   - dataLayer grew from ${initialLen} to ${afterLen}`);
  console.log(`   - generate_lead count: ${afterDataLayer.generateLeadCount}`);
  console.log(`   - Last 3 events:`, afterDataLayer.lastEvents);

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
