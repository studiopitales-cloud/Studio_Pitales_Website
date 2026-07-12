import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

// Capture dataLayer events
const dataLayerEvents = [];
page.on('console', (msg) => {
  if (msg.text().includes('dataLayer')) {
    dataLayerEvents.push(msg.text());
  }
});

try {
  console.log('📍 Step 1: Opening production site...');
  await page.goto('https://www.studiopitales.co.il', { waitUntil: 'networkidle2', timeout: 30000 });
  console.log('✅ Page loaded\n');

  // Wait for GA4 to initialize
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

  console.log('📍 Step 2: Testing open_lead_form event...');

  // Check if trackOpenLeadForm function exists
  const hasTrackOpenLeadForm = await page.evaluate(() => {
    // Try to find and click a "תיאום שיעור היכרות" button
    const buttons = Array.from(document.querySelectorAll('a, button'));
    const bookButton = buttons.find(b => b.textContent.includes('תיאום שיעור היכרות'));

    console.log('Found book button:', !!bookButton);

    if (bookButton) {
      // Log before click
      console.log('Before click - dataLayer length:', window.dataLayer?.length);

      // Click it
      bookButton.click();

      return true;
    }
    return false;
  });

  if (hasTrackOpenLeadForm) {
    console.log('✅ Book lesson button found and clicked');

    // Wait for event to be sent
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

    const eventData = await page.evaluate(() => {
      return {
        dataLayerLength: window.dataLayer?.length,
        hasOpenLeadForm: window.dataLayer?.some(item =>
          Array.isArray(item) && item[0] === 'event' && item[1] === 'open_lead_form'
        ),
        recentEvents: window.dataLayer?.slice(-5).map(e =>
          Array.isArray(e) ? `[${e[0]}, ${e[1]}]` : JSON.stringify(e).substring(0, 60)
        )
      };
    });

    console.log(`\n📊 After clicking book button:`);
    console.log(`   - dataLayer events: ${eventData.dataLayerLength}`);
    console.log(`   - Has open_lead_form: ${eventData.hasOpenLeadForm ? '✅ YES' : '❌ NO'}`);
    console.log(`   - Recent events:`, eventData.recentEvents);
  } else {
    console.log('❌ Book lesson button not found');
  }

  console.log('\n📍 Step 3: Testing generate_lead event via Footer form...');

  // Scroll to footer
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 5));
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

  // Try to find and fill the footer form
  const formSubmitted = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input[type="tel"], input[type="text"]'));
    const nameInput = inputs.find(i => i.placeholder?.includes('שם') || i.placeholder?.includes('name'));
    const phoneInput = inputs.find(i => i.placeholder?.includes('טלפון') || i.placeholder?.includes('phone'));

    console.log('Found name input:', !!nameInput);
    console.log('Found phone input:', !!phoneInput);

    if (nameInput && phoneInput) {
      nameInput.value = 'בדיקה טופס';
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));

      phoneInput.value = '0501234567';
      phoneInput.dispatchEvent(new Event('input', { bubbles: true }));

      // Find submit button
      const submitBtn = Array.from(document.querySelectorAll('button, [type="submit"]'))
        .find(b => b.textContent.includes('שלח') || b.textContent.includes('Send'));

      if (submitBtn) {
        console.log('Found submit button, clicking...');

        // Clear dataLayer to track only submit events
        window.dataLayer = [];

        submitBtn.click();
        return true;
      }
    }
    return false;
  });

  if (formSubmitted) {
    console.log('✅ Footer form submitted');

    // Wait for event to be sent
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    const formEventData = await page.evaluate(() => {
      return {
        dataLayerLength: window.dataLayer?.length,
        hasGenerateLead: window.dataLayer?.some(item =>
          Array.isArray(item) && item[0] === 'event' && item[1] === 'generate_lead'
        ),
        allEvents: window.dataLayer?.map(e =>
          Array.isArray(e) ? `[${e[0]}, ${e[1]}]` : JSON.stringify(e).substring(0, 80)
        )
      };
    });

    console.log(`\n📊 After Footer form submission:`);
    console.log(`   - dataLayer events after clear: ${formEventData.dataLayerLength}`);
    console.log(`   - Has generate_lead: ${formEventData.hasGenerateLead ? '✅ YES' : '❌ NO'}`);
    console.log(`   - Events captured:`, formEventData.allEvents);
  } else {
    console.log('❌ Footer form inputs not found');
  }

  // Final diagnosis
  console.log('\n\n🔍 DIAGNOSIS:');
  console.log('═══════════════════════════════════════');

  const finalState = await page.evaluate(() => {
    return {
      gtagExists: typeof window.gtag === 'function',
      dataLayerExists: Array.isArray(window.dataLayer),
      dataLayerLength: window.dataLayer?.length
    };
  });

  console.log(`✅ window.gtag exists: ${finalState.gtagExists}`);
  console.log(`✅ window.dataLayer exists: ${finalState.dataLayerExists}`);
  console.log(`✅ Total dataLayer events: ${finalState.dataLayerLength}`);

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
