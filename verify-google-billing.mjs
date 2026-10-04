import fs from 'fs';

const PLACE_ID = 'ChIJG19CHQCdAhURSgoUtzvciws';

// Get API key
let apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  try {
    const envContent = fs.readFileSync('.env', 'utf-8');
    const match = envContent.match(/GOOGLE_API_KEY=(.+)/);
    if (match) {
      apiKey = match[1].trim();
    }
  } catch (e) {}
}

console.log('🔐 Verifying Google Cloud Status\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('Step 1: Checking API Key Information');
console.log(`   Key Found: ${apiKey ? '✅ Yes' : '❌ No'}`);
if (apiKey) {
  console.log(`   Format: ${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}`);
  console.log(`   Length: ${apiKey.length} characters`);
}

console.log('\nStep 2: Testing API Call\n');

const endpoint = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount&key=${apiKey}`;

fetch(endpoint)
  .then(async r => {
    const data = await r.json();

    console.log(`Status: ${r.status} ${r.statusText}`);

    if (data.error) {
      const err = data.error;
      console.log(`\nError Code: ${err.code}`);
      console.log(`Error Message: ${err.message}`);
      console.log(`Error Status: ${err.status}`);

      if (err.details && err.details.length > 0) {
        console.log(`\nError Details:`);
        err.details.forEach((detail, i) => {
          if (detail['@type'] === 'type.googleapis.com/google.rpc.LocalizedMessage') {
            console.log(`   ${detail.message}`);
          }
        });
      }

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('🔍 Analysis:\n');

      // Diagnose the issue
      if (err.message.includes('expired')) {
        console.log('❌ ISSUE: API Key is EXPIRED');
        console.log('\n📌 Possible Causes:');
        console.log('   1. Google Cloud Free Trial ended');
        console.log('   2. Project billing account was disabled');
        console.log('   3. API Key was manually revoked');
        console.log('\n✅ Solution:');
        console.log('   Go to: https://console.cloud.google.com/');
        console.log('   1. Select your Project');
        console.log('   2. Go to: APIs & Services → Credentials');
        console.log('   3. Click the API Key that looks like: AIzaSy...');
        console.log('   4. Check: "Restrictions" section');
        console.log('   5. You should see either:');
        console.log('      - "Billing account not linked" message, OR');
        console.log('      - "Project billing disabled" message');
        console.log('\n   Then either:');
        console.log('   A) Link a billing account (paid)');
        console.log('   B) Create new project with free trial');
      } else if (err.message.includes('invalid')) {
        console.log('❌ ISSUE: API Key is INVALID');
        console.log('   This could mean:');
        console.log('   - Key was deleted');
        console.log('   - Project ID is wrong');
        console.log('   - Permissions were revoked');
      } else {
        console.log(`❌ ISSUE: ${err.message}`);
      }
    } else {
      console.log('✅ API is working correctly!');
      console.log(`   Rating: ${data.rating}`);
      console.log(`   Reviews: ${data.userRatingCount}`);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  })
  .catch(err => {
    console.log(`❌ Network Error: ${err.message}`);
  });
