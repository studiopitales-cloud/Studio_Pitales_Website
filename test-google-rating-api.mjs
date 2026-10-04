import fs from 'fs';

const PLACE_ID = 'ChIJG19CHQCdAhURSgoUtzvciws';

// Try to read API key from environment or .env file
let apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  // Try reading from .env file
  try {
    const envContent = fs.readFileSync('.env', 'utf-8');
    const match = envContent.match(/GOOGLE_API_KEY=(.+)/);
    if (match) {
      apiKey = match[1].trim();
    }
  } catch (e) {
    // .env file doesn't exist
  }
}

console.log('🔍 Google Places API Deep Test\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Check 1: API Key
console.log('✓ Check 1: API Key Status');
if (!apiKey) {
  console.log('   ❌ GOOGLE_API_KEY is NOT set in environment');
  console.log('   📍 Expected in: .env or process.env.GOOGLE_API_KEY');
  process.exit(1);
} else {
  const masked = apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 4);
  console.log(`   ✅ Found: ${masked}`);
}

console.log('\n✓ Check 2: Place ID');
console.log(`   📍 Place ID: ${PLACE_ID}`);
console.log('   📍 Location: Pitales Studio, Ashkelon');

console.log('\n✓ Check 3: API Endpoint');
const endpoint = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount&key=${apiKey}`;
console.log(`   📍 URL: https://places.googleapis.com/v1/places/{PLACE_ID}`);
console.log(`   📍 Fields: rating, userRatingCount`);

console.log('\n✓ Check 4: Making HTTP request...\n');

fetch(endpoint)
  .then(async r => {
    console.log(`   Status Code: ${r.status} ${r.statusText}`);
    console.log(`   Headers:`, Object.fromEntries(r.headers));

    const data = await r.json();
    console.log(`\n   Response Data:`);
    console.log(JSON.stringify(data, null, 2));

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Analysis
    console.log('✓ Analysis:\n');

    if (data.error) {
      console.log(`   ❌ ERROR: ${data.error.code}`);
      console.log(`   📝 Message: ${data.error.message}`);
      console.log('\n   💡 Common fixes:');
      console.log('      1. Check if API key is valid');
      console.log('      2. Enable Places API (New) in Google Cloud Console');
      console.log('      3. Check if billing is enabled');
      console.log('      4. Verify API key has correct permissions');
    } else if (data.rating === undefined && data.userRatingCount === undefined) {
      console.log('   ⚠️  Response is empty - no rating or count data');
      console.log(`   Response keys: ${Object.keys(data).join(', ')}`);
    } else {
      console.log(`   ✅ Rating: ${data.rating || 'N/A'}`);
      console.log(`   ✅ Review Count: ${data.userRatingCount || 'N/A'}`);

      if (data.userRatingCount) {
        console.log(`\n   🎯 Current Google Reviews: ${data.userRatingCount}`);
        console.log(`   📊 Fallback in code: 62`);
        if (data.userRatingCount !== 62) {
          console.log(`   ⚠️  Count mismatch! Consider updating fallback to ${data.userRatingCount}`);
        }
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  })
  .catch(err => {
    console.log(`   ❌ Network Error: ${err.message}`);
    console.log(`   📝 Details: ${err.toString()}`);
    console.log('\n   💡 Possible issues:');
    console.log('      1. No internet connection');
    console.log('      2. API endpoint is unreachable');
    console.log('      3. CORS or firewall issue');
  });
