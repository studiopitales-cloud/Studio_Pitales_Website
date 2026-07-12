import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

try {
  console.log('📍 Fetching production site source...');
  const response = await page.goto('https://www.studiopitales.co.il', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  console.log('Response status:', response.status());

  // Get page source
  const source = await page.content();

  // Check for trackLead
  if (source.includes('trackLead')) {
    console.log('\n✅ "trackLead" found in HTML source');
    // Find the context
    const index = source.indexOf('trackLead');
    console.log('Context:', source.substring(Math.max(0, index - 100), index + 150));
  } else {
    console.log('\n❌ "trackLead" NOT found in HTML source');
  }

  // Check for metaPixel imports
  if (source.includes('metaPixel')) {
    console.log('\n✅ "metaPixel" found in HTML source');
  } else {
    console.log('\n❌ "metaPixel" NOT found in HTML source');
  }

  // Check for fbq in source
  if (source.includes('fbq(') && source.includes("'track'")) {
    console.log('\n✅ fbq() tracking calls found in source');
  } else {
    console.log('\n❌ No fbq tracking calls in source');
  }

  // Check ContactSheet
  if (source.includes('ContactSheet')) {
    console.log('\n✅ ContactSheet component present');
  } else {
    console.log('\n❌ ContactSheet component NOT found');
  }

  // Look for React app bundle
  const hasReactApp = source.includes('type="module"') && source.includes('src/');
  console.log('\n📦 Has React app bundle:', hasReactApp ? '✅ YES' : '❌ NO');

  // Check if it's a built production version
  const hasBuildOutput = source.includes('.js') || source.includes('.css');
  console.log('Has build output:', hasBuildOutput ? '✅ YES' : '❌ NO');

  // Get first 2000 chars to understand structure
  console.log('\n📋 First 2000 chars of HTML:');
  console.log(source.substring(0, 2000));

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
