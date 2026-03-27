import neo4j from 'neo4j-driver';

const uri = 'neo4j+s://c25f6610.databases.neo4j.io';
const username = 'neo4j';

// Original password with Cyrillic Х
const originalPassword = 'zdHkX6I01NK4COA6yV7Lo5pxbelakHcfYqnx7Х27rUs';

// Try ASCII replacement (Cyrillic Х -> Latin X)
const asciiPassword = originalPassword.replace('Х', 'X');

// Try another variation - maybe last character is wrong
const trimmedPassword = 'zdHkX6I01NK4COA6yV7Lo5pxbelakHcfYqnx7X27rUs';

console.log('Testing different password variations for Neo4j Aura');
console.log('URI:', uri);
console.log('Username:', username);

const testCases = [
  { name: 'Original (with Cyrillic Х)', password: originalPassword },
  { name: 'ASCII (Cyrillic Х -> X)', password: asciiPassword },
  { name: 'Trimmed ASCII', password: trimmedPassword },
  { name: 'Maybe shorter', password: 'zdHkX6I01NK4COA6yV7Lo5pxbelakHcfYqnx7X27rU' },
  { name: 'Maybe without numbers', password: 'zdHkXINkCOAyVLoPxbelakHcfYqnxXrUs' },
];

for (const test of testCases) {
  console.log(`\n=== Testing: ${test.name} ===`);
  console.log('Password length:', test.password.length);

  try {
    const driver = neo4j.driver(uri, neo4j.auth.basic(username, test.password), {});
    const session = driver.session({ database: 'neo4j' });
    const result = await session.run('RETURN 1 as n');
    const value = result.records[0].get('n');
    await session.close();
    await driver.close();
    console.log('✅ SUCCESS! Connected with password:', test.password.substring(0, 5) + '...');
    console.log('Full password:', test.password);
    process.exit(0);
  } catch (error) {
    console.log('❌ Failed:', error.code || error.message.split('\n')[0]);
  }
}

console.log('\n=== All tests failed ===');
console.log(
  'Please reset your Neo4j Aura password to a simple ASCII password without special characters.'
);
console.log('Recommended format: 16-32 characters with letters and numbers only.');
process.exit(1);
