import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

try {
  console.log('📍 Loading site...');
  await page.goto('https://www.studiopitales.co.il', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));
  console.log('✅ Loaded\n');

  console.log('📍 Opening form...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('a, button'));
    const bookBtn = buttons.find(b => b.textContent.includes('תיאום שיעור היכרות'));
    if (bookBtn) bookBtn.click();
  });

  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1500)));

  console.log('📍 Filling form...');

  const inputs = await page.evaluate(() => {
    const allInputs = Array.from(document.querySelectorAll('input'));
    console.log(`Total inputs: ${allInputs.length}`);

    // Get last 2 inputs
    const formInputs = allInputs.slice(-2);

    // Fill name
    formInputs[0].value = 'בדיקה טופס';
    formInputs[0].dispatchEvent(new Event('input', { bubbles: true }));
    formInputs[0].dispatchEvent(new Event('change', { bubbles: true }));

    // Fill phone
    formInputs[1].value = '0501234567';
    formInputs[1].dispatchEvent(new Event('input', { bubbles: true }));
    formInputs[1].dispatchEvent(new Event('change', { bubbles: true }));

    return {
      nameValue: formInputs[0].value,
      phoneValue: formInputs[1].value,
      nameValid: formInputs[0].value.trim().length >= 2,
      phoneValid: /^05\d{8}$/.test(formInputs[1].value),
    };
  });

  console.log(`   Name: "${inputs.nameValue}" - Valid: ${inputs.nameValid}`);
  console.log(`   Phone: "${inputs.phoneValue}" - Valid: ${inputs.phoneValid}`);
  console.log(`   Both valid: ${inputs.nameValid && inputs.phoneValid}\n`);

  if (!inputs.nameValid || !inputs.phoneValid) {
    console.log('⚠️  VALIDATION FAILED!');
    await browser.close();
    process.exit(1);
  }

  console.log('📍 Finding submit button...');

  const submitInfo = await page.evaluate(() => {
    const allButtons = Array.from(document.querySelectorAll('button'));
    const submitBtn = allButtons.find(b => b.textContent.toLowerCase().includes('שלח'));

    if (!submitBtn) {
      return { found: false };
    }

    return {
      found: true,
      text: submitBtn.textContent,
      disabled: submitBtn.disabled,
      visible: submitBtn.offsetParent !== null,
      classList: Array.from(submitBtn.classList).slice(0, 5),
    };
  });

  console.log(`   Found: ${submitInfo.found}`);
  if (submitInfo.found) {
    console.log(`   Text: "${submitInfo.text}"`);
    console.log(`   Disabled: ${submitInfo.disabled}`);
    console.log(`   Visible: ${submitInfo.visible}`);
  }

  if (!submitInfo.found || submitInfo.disabled) {
    console.log('\n⚠️  CANNOT SUBMIT!');
    await browser.close();
    process.exit(1);
  }

  console.log('\n📍 Clicking submit button...');

  const submitted = await page.evaluate(() => {
    const allButtons = Array.from(document.querySelectorAll('button'));
    const submitBtn = allButtons.find(b => b.textContent.toLowerCase().includes('שלח'));

    if (submitBtn && !submitBtn.disabled) {
      console.log('Clicking submit...');
      submitBtn.click();
      return true;
    }
    return false;
  });

  console.log(`   Submitted: ${submitted}\n`);

  if (submitted) {
    // Wait for network activity
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    // Check dataLayer
    const result = await page.evaluate(() => {
      const events = window.dataLayer || [];
      const generateLead = events.find(e =>
        Array.isArray(e) && e[0] === 'event' && e[1] === 'generate_lead'
      );

      return {
        dataLayerSize: events.length,
        generateLeadFound: !!generateLead,
        lastEvent: events[events.length - 1],
      };
    });

    console.log('📊 Result:');
    console.log(`   - generate_lead found: ${result.generateLeadFound}`);
    console.log(`   - dataLayer size: ${result.dataLayerSize}`);
    console.log(`   - Last event:`, JSON.stringify(result.lastEvent).substring(0, 100));
  }

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
