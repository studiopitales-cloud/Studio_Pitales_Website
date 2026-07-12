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

  // Scroll to footer
  console.log('📍 Scrolling to footer...');
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 6));
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

  // Try to find and fill footer form
  console.log('📍 Finding footer form inputs...');

  const formInfo = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input'));
    console.log(`Found ${inputs.length} inputs`);

    const nameInputs = inputs.filter(i => i.placeholder?.toLowerCase().includes('שם'));
    const phoneInputs = inputs.filter(i => i.placeholder?.toLowerCase().includes('טלפון'));

    console.log(`Name inputs: ${nameInputs.length}, Phone inputs: ${phoneInputs.length}`);

    return {
      totalInputs: inputs.length,
      nameInputCount: nameInputs.length,
      phoneInputCount: phoneInputs.length,
      samplePlaceholders: inputs.map(i => i.placeholder).filter(Boolean),
    };
  });

  console.log(`   Total inputs: ${formInfo.totalInputs}`);
  console.log(`   Sample placeholders:`, formInfo.samplePlaceholders.slice(0, 5));

  // Find and fill the form
  console.log('\n📍 Filling and submitting form...');

  const submitResult = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input'));

    // Find name and phone inputs
    let nameInput, phoneInput;

    inputs.forEach(input => {
      const placeholder = input.placeholder?.toLowerCase() || '';
      if (placeholder.includes('שם') || placeholder.includes('name')) {
        nameInput = input;
      }
      if (placeholder.includes('טלפון') || placeholder.includes('phone')) {
        phoneInput = input;
      }
    });

    console.log(`Name input found: ${!!nameInput}`);
    console.log(`Phone input found: ${!!phoneInput}`);

    if (!nameInput || !phoneInput) {
      return { success: false, message: 'Inputs not found' };
    }

    // Fill inputs
    nameInput.value = 'בדיקה משתמש';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));

    phoneInput.value = '0501234567';
    phoneInput.dispatchEvent(new Event('input', { bubbles: true }));

    // Get clear dataLayer length before submit
    const beforeCount = (window.dataLayer || []).length;

    // Find and click submit button
    const buttons = Array.from(document.querySelectorAll('button'));
    const submitBtn = buttons.find(b => b.textContent.includes('שלח'));

    console.log(`Submit button found: ${!!submitBtn}`);

    if (submitBtn) {
      submitBtn.click();
      return {
        success: true,
        beforeDataLayerCount: beforeCount,
        message: 'Form submitted',
      };
    }

    return { success: false, message: 'Submit button not found' };
  });

  console.log(`   ${submitResult.message}`);
  console.log(`   Before dataLayer count: ${submitResult.beforeDataLayerCount}\n`);

  if (submitResult.success) {
    // Wait for submit to complete
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    // Check if generate_lead was sent
    const finalData = await page.evaluate(() => {
      const events = window.dataLayer || [];
      const generateLeadEvents = events.filter(e =>
        Array.isArray(e) && e[0] === 'event' && e[1] === 'generate_lead'
      );

      return {
        totalEvents: events.length,
        generateLeadCount: generateLeadEvents.length,
        lastEvents: events.slice(-5).map(e => {
          if (Array.isArray(e)) return `[${e[0]}, ${e[1]}]`;
          return JSON.stringify(e).substring(0, 60);
        }),
      };
    });

    console.log('📊 After form submission:');
    console.log(`   - Total dataLayer events: ${finalData.totalEvents}`);
    console.log(`   - generate_lead events: ${finalData.generateLeadCount}`);
    console.log(`   - Last 5 events:`, finalData.lastEvents);
  }

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
