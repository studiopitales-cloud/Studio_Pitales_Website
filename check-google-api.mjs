import fs from 'fs';

// Read .env file
const envContent = fs.readFileSync('.env', 'utf-8');
const match = envContent.match(/GOOGLE_API_KEY=(.+)/);
const apiKey = match ? match[1].trim() : null;

const PLACE_ID = 'ChIJG19CHQCdAhURSgoUtzvciws';

console.log('🔍 Testing Google Places API\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (!apiKey) {
  console.log('❌ API Key not found in .env file');
  process.exit(1);
}

console.log(`✅ API Key found: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}\n`);

const endpoint = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=rating,userRatingCount&key=${apiKey}`;

console.log('📍 Making request to Google Places API...\n');

fetch(endpoint)
  .then(async r => {
    console.log(`Status: ${r.status} ${r.statusText}\n`);

    const data = await r.json();

    if (data.error) {
      console.log(`❌ ERROR: ${data.error.code}`);
      console.log(`Message: ${data.error.message}\n`);

      if (data.error.message.includes('expired')) {
        console.log('⚠️  API Key is still expired - billing might not be activated yet');
      } else if (data.error.message.includes('invalid')) {
        console.log('⚠️  API Key is invalid - check Google Cloud Console');
      }
    } else {
      console.log('✅ SUCCESS! API is working!\n');
      console.log(`📊 Studio Pitales Data:`);
      console.log(`   Rating: ${data.rating || 'N/A'} ⭐`);
      console.log(`   Reviews: ${data.userRatingCount || 'N/A'} 📝\n`);

      if (data.userRatingCount) {
        console.log(`🎯 Live count from Google: ${data.userRatingCount}`);
        if (data.userRatingCount !== 62) {
          console.log(`   Current fallback: 62`);
          console.log(`   💡 Consider updating fallback to: ${data.userRatingCount}`);
        }
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  })
  .catch(err => {
    console.log(`❌ Network error: ${err.message}`);
  });
