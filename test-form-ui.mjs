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

  console.log('📍 Opening ContactSheet modal...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('a, button'));
    const bookBtn = buttons.find(b => b.textContent.includes('תיאום שיעור היכרות'));
    if (bookBtn) {
      console.log('Book button found and clicked');
      bookBtn.click();
    } else {
      console.log('Book button NOT found!');
    }
  });

  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1500)));

  // Inspect what's in the modal
  const modalInfo = await page.evaluate(() => {
    // Find all inputs
    const inputs = Array.from(document.querySelectorAll('input'));

    // Find all buttons
    const buttons = Array.from(document.querySelectorAll('button'));

    // Find the modal/sheet container
    const backdrop = document.querySelector('[style*="backdrop"]') || document.querySelector('[class*="inset"]');

    return {
      inputsInPage: inputs.length,
      buttonsInPage: buttons.length,
      inputsSample: inputs.map((i, idx) => ({
        idx,
        placeholder: i.placeholder,
        type: i.type,
        value: i.value,
      })).slice(-3),
      buttonsSample: buttons.map((b, idx) => ({
        idx,
        text: b.textContent.substring(0, 30),
        type: b.type,
      })).slice(-5),
      backdropExists: !!backdrop,
    };
  });

  console.log('📊 Modal content:');
  console.log(`   - Total inputs in page: ${modalInfo.inputsInPage}`);
  console.log(`   - Total buttons in page: ${modalInfo.buttonsInPage}`);
  console.log(`   - Backdrop exists: ${modalInfo.backdropExists}`);
  console.log('\n   Last 3 inputs:');
  modalInfo.inputsSample.forEach(i => {
    console.log(`     [${i.idx}] ${i.type}: "${i.placeholder}" = "${i.value}"`);
  });
  console.log('\n   Last 5 buttons:');
  modalInfo.buttonsSample.forEach(b => {
    console.log(`     [${b.idx}] ${b.type}: "${b.text}"`);
  });

  console.log('\n📍 Filling form CAREFULLY...');

  // Fill form step by step
  const fillResult = await page.evaluate(() => {
    // Get ALL inputs
    const allInputs = Array.from(document.querySelectorAll('input'));
    console.log(`Step 1: Found ${allInputs.length} inputs total`);

    // Find the ones in the contact sheet (likely the last 2)
    const inputs = allInputs.slice(-2);

    if (inputs.length < 2) {
      return { success: false, message: `Not enough inputs: ${inputs.length}` };
    }

    // Fill name
    const nameInput = inputs[0];
    nameInput.value = 'בדיקה טופס';
    nameInput.dispatchEvent(new Event('change', { bubbles: true }));
    nameInput.dispatchEvent(new Event('blur', { bubbles: true }));
    console.log(`Step 2: Filled name input, value="${nameInput.value}"`);

    // Fill phone
    const phoneInput = inputs[1];
    phoneInput.value = '0501234567';
    phoneInput.dispatchEvent(new Event('change', { bubbles: true }));
    phoneInput.dispatchEvent(new Event('blur', { bubbles: true }));
    console.log(`Step 3: Filled phone input, value="${phoneInput.value}"`);

    // Find submit button
    const allButtons = Array.from(document.querySelectorAll('button'));
    const submitBtn = allButtons.find(b => {
      const text = b.textContent.toLowerCase();
      return text.includes('שלח') || text.includes('send') || text.includes('הזמ');
    });

    if (!submitBtn) {
      return { success: false, message: 'Submit button not found' };
    }

    console.log(`Step 4: Found submit button: "${submitBtn.textContent}"`);
    console.log(`         Button is disabled: ${submitBtn.disabled}`);
    console.log(`         Button is visible: ${submitBtn.offsetParent !== null}`);

    return { success: true, message: 'Form prepared' };
  });

  console.log(`   ${fillResult.message}\n`);

  if (fillResult.success) {
    console.log('📍 Now clicking submit button...');
    await page.click('button:has-text("שלח")').catch(() => {
      console.log('   (Button click via CSS selector failed, trying alternative)');
    });

    // Alternative: evaluate and click
    const clicked = await page.evaluate(() => {
      const allButtons = Array.from(document.querySelectorAll('button'));
      const submitBtn = allButtons.find(b => {
        const text = b.textContent.toLowerCase();
        return text.includes('שלח') || text.includes('send');
      });

      if (submitBtn) {
        console.log('Clicking button...');
        submitBtn.click();
        return true;
      }
      return false;
    });

    console.log(`   Clicked: ${clicked}\n`);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));
  }

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
