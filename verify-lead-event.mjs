import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

// Intercept all network requests to Meta
const metaRequests = [];
page.on('response', (response) => {
  const url = response.url();
  if (url.includes('facebook') || url.includes('fbevents')) {
    metaRequests.push({
      url: url,
      status: response.status(),
    });
  }
});

// Track fbq calls from the page
const fbqCalls = [];
await page.evaluateOnNewDocument(() => {
  window.fbqCalls = [];
  const originalFbq = window.fbq;
  window.fbq = function() {
    window.fbqCalls.push(Array.from(arguments));
    if (originalFbq && typeof originalFbq === 'function') {
      return originalFbq.apply(this, arguments);
    }
  };
  // Copy over properties
  if (originalFbq) {
    Object.assign(window.fbq, originalFbq);
  }
});

try {
  console.log('📍 Step 1: Opening production site (https://www.studiopitales.co.il)...');
  await page.goto('https://www.studiopitales.co.il', { waitUntil: 'networkidle2', timeout: 30000 });
  console.log('✅ Page loaded');

  // Check initial fbq state
  const initialState = await page.evaluate(() => {
    return {
      fbqExists: typeof window.fbq !== 'undefined',
      fbqCalls: window.fbqCalls || [],
    };
  });
  console.log('✅ fbq initialized:', initialState.fbqExists);
  console.log('📊 Initial fbq calls (PageView, etc):', initialState.fbqCalls);

  // Scroll to find contact button
  console.log('\n📍 Step 2: Looking for contact form...');
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

  // Get all interactive elements
  const elements = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, [role="button"], a'));
    return buttons
      .filter(el => el.offsetParent !== null) // visible
      .map(el => ({
        tag: el.tagName,
        text: el.textContent.substring(0, 50).trim(),
        role: el.getAttribute('role'),
      }))
      .slice(0, 15);
  });
  console.log('Found interactive elements:', elements);

  // Try to find and click contact-related button
  const contactFound = await page.evaluate(() => {
    const keywords = ['קשר', 'טל', 'הזמ', 'רישום', 'כרטיס'];
    const buttons = Array.from(document.querySelectorAll('button, [role="button"]'));

    for (const btn of buttons) {
      const text = btn.textContent.toLowerCase();
      if (keywords.some(kw => text.includes(kw))) {
        console.log('Found contact button:', btn.textContent.trim());
        btn.click();
        return true;
      }
    }
    return false;
  });

  if (contactFound) {
    console.log('✅ Contact form triggered');
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1500)));
  }

  // Find and fill form inputs
  console.log('\n📍 Step 3: Filling contact form...');
  const formState = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input'));
    console.log('Found', inputs.length, 'inputs');

    const results = [];
    for (let i = 0; i < Math.min(inputs.length, 2); i++) {
      const input = inputs[i];
      const placeholder = input.placeholder || input.getAttribute('aria-label') || '';

      if (i === 0) {
        // Assume first is name
        input.value = 'בדיקה משתמש';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        results.push(`Filled input 0 (likely name): ${placeholder}`);
      } else if (i === 1) {
        // Assume second is phone
        input.value = '0501234567';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        results.push(`Filled input 1 (likely phone): ${placeholder}`);
      }
    }
    return results;
  });
  console.log('✅ Form fields:', formState);

  // Clear fbqCalls to track only post-submission calls
  await page.evaluate(() => {
    window.fbqCalls = [];
  });

  // Submit form
  console.log('\n📍 Step 4: Submitting contact form...');
  const submitResult = await page.evaluate(() => {
    // Try to find and click submit button
    const buttons = Array.from(document.querySelectorAll('button, [type="submit"]'));
    for (const btn of buttons) {
      const text = btn.textContent.toLowerCase();
      if (text.includes('שלח') || text.includes('send') || text.includes('הזמ') || text.includes('בדיקה')) {
        console.log('Clicking submit button:', btn.textContent.trim());
        btn.click();
        return { clicked: true, text: btn.textContent.trim() };
      }
    }

    // Try form.submit()
    const form = document.querySelector('form');
    if (form) {
      form.submit();
      return { clicked: true, text: 'form.submit()' };
    }

    return { clicked: false };
  });

  if (submitResult.clicked) {
    console.log('✅ Form submitted via:', submitResult.text);
  } else {
    console.log('⚠️  Could not find submit button');
  }

  // Wait for async operations and network
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));

  // Check fbq calls after submission
  const finalState = await page.evaluate(() => {
    return {
      fbqCalls: window.fbqCalls || [],
    };
  });

  console.log('\n📊 fbq calls AFTER form submission:');
  console.log(JSON.stringify(finalState.fbqCalls, null, 2));

  // Check for Lead event
  const hasLeadEvent = finalState.fbqCalls.some(call =>
    Array.isArray(call) && call[0] === 'track' && call[1] === 'Lead'
  );

  console.log('\n🎯 RESULT: Lead event tracked?', hasLeadEvent ? '✅ YES' : '❌ NO');
  console.log('📡 Meta requests captured:', metaRequests.length);

  if (!hasLeadEvent) {
    console.log('\n⚠️  Lead event was NOT called after form submission');
    console.log('All fbq calls made during session:', finalState.fbqCalls);
  }

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
