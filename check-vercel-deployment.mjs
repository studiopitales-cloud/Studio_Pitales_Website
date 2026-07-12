import puppeteer from 'puppeteer';
import https from 'https';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

// Intercept requests to capture build info
const responses = [];
page.on('response', (response) => {
  responses.push({
    url: response.url(),
    status: response.status(),
    headers: response.headers(),
  });
});

try {
  console.log('📍 Checking Vercel deployment...\n');

  // Go to production site
  await page.goto('https://www.studiopitales.co.il', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  // Get page metadata
  const metadata = await page.evaluate(() => {
    return {
      title: document.title,
      url: window.location.href,
      // Check for deployment markers
      hasReactApp: document.querySelector('#root') !== null,
      htmlSource: document.documentElement.outerHTML.substring(0, 1000),
    };
  });

  console.log('✅ Site loaded from:', metadata.url);
  console.log('📄 Title:', metadata.title);
  console.log('⚡ React app present:', metadata.hasReactApp ? 'YES' : 'NO');

  // Look for X-Vercel headers
  const vercelHeaders = responses
    .flatMap(r => Object.entries(r.headers))
    .filter(([k]) => k.toLowerCase().includes('x-vercel') || k.toLowerCase().includes('vercel'));

  if (vercelHeaders.length > 0) {
    console.log('\n📦 Vercel headers found:');
    vercelHeaders.forEach(([k, v]) => {
      console.log(`  ${k}: ${v}`);
    });
  }

  // Check for deployment id in headers or body
  const pageSource = await page.content();
  const hasDeploymentInfo = pageSource.includes('__VERCEL__') ||
                           pageSource.includes('vercelDeploymentId');
  console.log('\n🔍 Vercel deployment marker:', hasDeploymentInfo ? 'Found' : 'Not found');

  // Check what JavaScript is loaded
  const scripts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('script')).map(s => ({
      src: s.src,
      type: s.type,
      async: s.async,
      defer: s.defer,
    }));
  });

  console.log('\n📜 Scripts loaded:');
  scripts.forEach(s => {
    if (s.src) {
      console.log(`  ${s.src}`);
    } else if (s.type === 'module') {
      console.log(`  [inline module]`);
    }
  });

  // Look for tracking in scripts
  console.log('\n🔍 Checking for Meta Pixel and Lead tracking...');

  // Check the actual fbq code
  const fbqCode = await page.evaluate(() => {
    // Get all script content
    const scripts = Array.from(document.querySelectorAll('script'));
    let fbqInit = false;
    let trackLeadCode = false;

    for (const script of scripts) {
      const text = script.textContent;
      if (text.includes("fbq('init'")) {
        fbqInit = true;
      }
      if (text.includes("'track', 'Lead'") || text.includes('"track", "Lead"')) {
        trackLeadCode = true;
      }
    }

    return { fbqInit, trackLeadCode };
  });

  console.log(`  fbq('init', ...) present: ${fbqCode.fbqInit ? '✅ YES' : '❌ NO'}`);
  console.log(`  fbq('track', 'Lead') present: ${fbqCode.trackLeadCode ? '✅ YES' : '❌ NO'}`);

  // Try to find the main app bundle
  const appBundle = scripts.find(s => s.src && s.src.includes('/dist/') && s.src.endsWith('.js'));
  if (appBundle) {
    console.log('\n📦 App bundle found:', appBundle.src);
  }

  console.log('\n📋 Summary:');
  console.log('Current production status:');
  console.log('  - Site accessible: ✅');
  console.log(`  - React app: ${metadata.hasReactApp ? '✅' : '❌'}`);
  console.log(`  - fbq initialized: ${fbqCode.fbqInit ? '✅' : '❌'}`);
  console.log(`  - Lead tracking: ${fbqCode.trackLeadCode ? '✅' : '❌'}`);

  if (!fbqCode.trackLeadCode) {
    console.log('\n⚠️  CONCLUSION: Production is NOT running the latest commit (58a0304)');
    console.log('   The "Lead" event tracking code is missing.');
  } else {
    console.log('\n✅ CONCLUSION: Production appears to be running the latest code');
  }

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
