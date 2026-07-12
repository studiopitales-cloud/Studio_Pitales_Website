import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

try {
  console.log('📍 Loading production site and inspecting bundle...\n');

  await page.goto('https://www.studiopitales.co.il', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  // Get all scripts
  const scripts = await page.evaluate(() => {
    const scriptElements = Array.from(document.querySelectorAll('script'));
    return scriptElements.map(s => ({
      src: s.src,
      hasTrackLead: s.textContent.includes('trackLead'),
      hasQuotedLead: s.textContent.includes("'Lead'") || s.textContent.includes('"Lead"'),
      size: s.textContent.length,
    }));
  });

  console.log('Scripts found:');
  scripts.forEach((s, i) => {
    if (s.src) {
      console.log(`\n${i}. External: ${s.src}`);
    } else {
      console.log(`\n${i}. Inline script (${s.size} bytes)`);
    }
    console.log(`   - Contains "trackLead": ${s.hasTrackLead ? '✅ YES' : '❌ NO'}`);
    console.log(`   - Contains "'Lead'" or '"Lead"': ${s.hasQuotedLead ? '✅ YES' : '❌ NO'}`);
  });

  // Look for the main bundle and fetch it to check content
  const mainBundleScript = scripts.find(s => s.src && s.src.includes('/assets/index-') && s.src.endsWith('.js'));
  if (mainBundleScript) {
    console.log('\n🔍 Checking main bundle for trackLead function...');

    // Fetch the bundle
    const bundleUrl = mainBundleScript.src;
    console.log(`   URL: ${bundleUrl}`);

    try {
      const response = await fetch(bundleUrl);
      const bundleText = await response.text();

      const hasTrackLeadFn = bundleText.includes('trackLead');
      const hasLeadEvent = bundleText.includes("'track','Lead'") || bundleText.includes("'track', 'Lead'") || bundleText.includes('"track","Lead"') || bundleText.includes('"track", "Lead"');

      console.log(`   ✅ Bundle size: ${bundleText.length} bytes`);
      console.log(`   ✅ Contains "trackLead": ${hasTrackLeadFn ? '✅ YES' : '❌ NO'}`);
      console.log(`   ✅ Contains Lead event call: ${hasLeadEvent ? '✅ YES' : '❌ NO'}`);

      if (hasTrackLeadFn) {
        // Extract context
        const idx = bundleText.indexOf('trackLead');
        const context = bundleText.substring(Math.max(0, idx - 100), idx + 200);
        console.log('\n   Context around trackLead:');
        console.log('   ', context.substring(0, 150) + '...');
      }
    } catch (err) {
      console.log(`   ❌ Could not fetch bundle: ${err.message}`);
    }
  }

  // Also check for fbq calls in inline scripts
  console.log('\n📋 Checking inline scripts for fbq initialization...');
  const fbqScripts = scripts.filter(s => !s.src);
  fbqScripts.forEach((s, i) => {
    if (s.hasQuotedLead || s.textContent.includes('fbq')) {
      console.log(`\n   Inline script ${i} (${s.size} bytes):`);
      console.log(`   - fbq init: ${s.textContent.includes("fbq('init'") ? '✅' : '❌'}`);
      console.log(`   - fbq track: ${s.textContent.includes("fbq('track'") ? '✅' : '❌'}`);
      console.log(`   - Lead: ${s.hasQuotedLead ? '✅' : '❌'}`);
    }
  });

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
