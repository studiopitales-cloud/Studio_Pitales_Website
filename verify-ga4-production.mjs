import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

// Capture console messages
const consoleLogs = [];
page.on('console', msg => {
  consoleLogs.push({
    type: msg.type(),
    text: msg.text(),
  });
});

// Capture network requests to GA4
const ga4Requests = [];
page.on('response', (response) => {
  const url = response.url();
  if (url.includes('google-analytics') || url.includes('googletagmanager') || url.includes('g/collect')) {
    ga4Requests.push({
      url: url,
      status: response.status(),
    });
  }
});

try {
  console.log('📍 Step 1: Opening production site...');
  await page.goto('https://www.studiopitales.co.il', { waitUntil: 'networkidle2', timeout: 30000 });
  console.log('✅ Page loaded\n');

  // Check GA4 initialization
  console.log('📍 Step 2: Checking GA4 initialization...');
  const ga4State = await page.evaluate(() => {
    return {
      hasDataLayer: typeof window.dataLayer !== 'undefined',
      dataLayerLength: window.dataLayer ? window.dataLayer.length : 0,
      hasGtag: typeof window.gtag !== 'undefined',
      gtagType: typeof window.gtag,
      // Check for GA4 script in DOM
      hasGAScript: Array.from(document.scripts).some(s =>
        s.src.includes('googletagmanager') && s.src.includes('G-9G2SBH2MJ0')
      ),
      gtagCallsSample: window.dataLayer ? window.dataLayer.slice(0, 5) : [],
    };
  });

  console.log('✅ GA4 State:');
  console.log(`   - window.dataLayer exists: ${ga4State.hasDataLayer ? '✅ YES' : '❌ NO'}`);
  console.log(`   - dataLayer entries: ${ga4State.dataLayerLength}`);
  console.log(`   - window.gtag exists: ${ga4State.hasGtag ? '✅ YES' : '❌ NO'}`);
  console.log(`   - window.gtag type: ${ga4State.gtagType}`);
  console.log(`   - GA4 script in DOM: ${ga4State.hasGAScript ? '✅ YES' : '❌ NO'}`);
  console.log(`   - First gtag calls:`);
  ga4State.gtagCallsSample.forEach((call, i) => {
    console.log(`      ${i + 1}. ${JSON.stringify(call).substring(0, 80)}...`);
  });

  // Check all scripts
  console.log('\n📍 Step 3: All scripts loaded:');
  const scripts = await page.evaluate(() => {
    return Array.from(document.scripts).map(s => ({
      src: s.src || '(inline)',
      isGA4: s.src?.includes('googletagmanager'),
      isGA4Measurement: s.src?.includes('G-9G2SBH2MJ0'),
    }));
  });

  const ga4Scripts = scripts.filter(s => s.isGA4 || s.isGA4Measurement);
  if (ga4Scripts.length > 0) {
    console.log('✅ GA4 Scripts found:');
    ga4Scripts.forEach(s => {
      console.log(`   - ${s.src}`);
    });
  } else {
    console.log('❌ NO GA4 scripts found in DOM');
  }

  // Wait a bit for GA4 to fully initialize
  console.log('\n📍 Step 4: Waiting for GA4 initialization...');
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));

  // Check dataLayer after wait
  const ga4StateAfter = await page.evaluate(() => {
    return {
      dataLayerLength: window.dataLayer ? window.dataLayer.length : 0,
      hasPageViewEvent: window.dataLayer ? window.dataLayer.some(item =>
        Array.isArray(item) && item[0] === 'event' && item[1] === 'page_view'
      ) : false,
      gtagCallsAfter: window.dataLayer ? window.dataLayer : [],
    };
  });

  console.log(`✅ After initialization:
   - dataLayer entries: ${ga4StateAfter.dataLayerLength}
   - Has page_view event: ${ga4StateAfter.hasPageViewEvent ? '✅ YES' : '❌ NO'}`);

  if (ga4StateAfter.gtagCallsAfter.length > 0) {
    console.log('\n   Complete dataLayer:');
    ga4StateAfter.gtagCallsAfter.forEach((call, i) => {
      console.log(`   ${i + 1}. ${JSON.stringify(call)}`);
    });
  }

  // Check network requests
  console.log('\n📍 Step 5: GA4 Network Requests:');
  if (ga4Requests.length > 0) {
    console.log(`✅ ${ga4Requests.length} GA4 network request(s) made:`);
    ga4Requests.forEach((req, i) => {
      console.log(`   ${i + 1}. ${req.url.substring(0, 120)}...`);
      console.log(`      Status: ${req.status}`);
    });
  } else {
    console.log('❌ NO GA4 network requests detected');
  }

  // Console logs
  console.log('\n📍 Step 6: Console Messages:');
  if (consoleLogs.length > 0) {
    consoleLogs.forEach(log => {
      console.log(`   [${log.type.toUpperCase()}] ${log.text}`);
    });
  } else {
    console.log('✅ No console errors');
  }

  // Final diagnosis
  console.log('\n\n🔍 DIAGNOSIS:');
  console.log('═══════════════════════════════════════');

  const issues = [];

  if (!ga4State.hasDataLayer) {
    issues.push('❌ window.dataLayer NOT found');
  }
  if (!ga4State.hasGtag) {
    issues.push('❌ window.gtag function NOT found');
  }
  if (!ga4State.hasGAScript) {
    issues.push('❌ GA4 script NOT in DOM');
  }
  if (ga4Requests.length === 0) {
    issues.push('❌ NO network requests to GA4');
  }
  if (!ga4StateAfter.hasPageViewEvent) {
    issues.push('⚠️  No page_view event in dataLayer');
  }

  if (issues.length === 0) {
    console.log('✅ ALL CHECKS PASSED - GA4 is working correctly!');
  } else {
    console.log('ISSUES FOUND:');
    issues.forEach(issue => console.log(`  ${issue}`));
  }

} catch (err) {
  console.error('❌ Error:', err.message);
  console.error(err);
} finally {
  await browser.close();
}
