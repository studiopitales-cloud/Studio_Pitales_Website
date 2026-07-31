import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/User/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

// Capture console messages
const consoleMsgs = [];
page.on('console', msg => {
  const text = msg.text();
  consoleMsgs.push(`[${msg.type()}] ${text}`);
  if (text.includes('trackGenerateLead') || text.includes('fetch error')) {
    console.log('🔔 CONSOLE:', text);
  }
});

try {
  console.log('📍 Loading site...');
  await page.goto('https://www.studiopitales.co.il', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

  console.log('📍 Opening form and submitting...');

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('a, button'));
    const bookBtn = buttons.find(b => b.textContent.includes('תיאום שיעור היכרות'));
    if (bookBtn) bookBtn.click();
  });

  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1500)));

  // Fill and submit
  await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input'));
    const formInputs = inputs.slice(-2);

    formInputs[0].value = 'בדיקה טופס';
    formInputs[0].dispatchEvent(new Event('input', { bubbles: true }));

    formInputs[1].value = '0501234567';
    formInputs[1].dispatchEvent(new Event('input', { bubbles: true }));

    const submitBtn = Array.from(document.querySelectorAll('button')).find(b =>
      b.textContent.toLowerCase().includes('שלח')
    );

    if (submitBtn) submitBtn.click();
  });

  // Wait for submit to complete
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));

  console.log('\n📊 Console messages:');
  const filtered = consoleMsgs.filter(m =>
    m.includes('trackGenerateLead') || m.includes('fetch') || m.includes('error')
  );

  if (filtered.length === 0) {
    console.log('   ❌ NO RELEVANT CONSOLE MESSAGES!');
  } else {
    filtered.forEach(msg => console.log(`   ${msg}`));
  }

  console.log(`\n📊 All console messages (${consoleMsgs.length} total):`);
  consoleMsgs.slice(-10).forEach(msg => console.log(`   ${msg}`));

} catch (err) {
  console.error('❌ Error:', err.message);
} finally {
  await browser.close();
}
