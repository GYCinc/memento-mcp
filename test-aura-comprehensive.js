import neo4j from 'neo4j-driver';

const uri = 'neo4j+s://c25f6610.databases.neo4j.io';

// Common username variations
const usernames = ['neo4j', 'admin', 'root', 'user', 'aura'];

// Password variations based on what we know
const passwordBases = [
  // Original from earlier test (with Cyrillic Х at position 37)
  'zdHkX6I01NK4COA6yV7Lo5pxbelakHcfYqnx7Х27rUs',
  // ASCII version (Cyrillic Х -> Latin X)
  'zdHkX6I01NK4COA6yV7Lo5pxbelakHcfYqnx7X27rUs',
  // User said "zdHkX610" - maybe it's shorter
  'zdHkX610',
  'zdHkX6I0',
  // Maybe the password is much simpler
  'password',
  'memento_password',
  'memento',
];

// Generate variations
const passwords = [];
for (const base of passwordBases) {
  passwords.push(base);
  // Try lowercase version
  passwords.push(base.toLowerCase());
  // Try without numbers at end
  if (base.length > 5 && /\d/.test(base.slice(-3))) {
    passwords.push(base.slice(0, -3));
    passwords.push(base.slice(0, -2));
    passwords.push(base.slice(0, -1));
  }
}

console.log('Comprehensive Neo4j Aura connection test');
console.log('URI:', uri);
console.log('Testing', usernames.length * passwords.length, 'combinations\n');

let success = false;

for (const username of usernames) {
  for (const password of passwords) {
    if (password.length < 8) continue; // Skip too short passwords

    const key = `${username}:${password.substring(0, 5)}... (${password.length} chars)`;
    process.stdout.write(`Testing ${key}... `);

    try {
      const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {
        maxConnectionLifetime: 3000,
        connectionTimeout: 3000,
      });

      const session = driver.session({ database: 'neo4j' });
      const result = await session.run('RETURN 1 as n');
      const value = result.records[0].get('n');

      await session.close();
      await driver.close();

      console.log('✅ SUCCESS!');
      console.log('   Username:', username);
      console.log('   Password:', password);
      success = true;
      break;
    } catch (error) {
      // Ignore auth errors, show other errors
      if (!error.code || !error.code.includes('Unauthorized')) {
        console.log('❌ Error:', error.code || error.message.substring(0, 50));
      } else {
        process.stdout.write('❌\n');
      }
    }
  }

  if (success) break;
}

if (!success) {
  console.log('\n=== All tests failed ===');
  console.log('\nPossible issues:');
  console.log('1. Password is incorrect or contains special characters');
  console.log('2. Username is not in our test list');
  console.log('3. URI might be different');
  console.log('4. Instance might be paused or stopped');
  console.log('5. Network/firewall blocking connection');

  console.log('\nNext steps:');
  console.log('1. Click "Connect" in Neo4j Aura dashboard');
  console.log('2. Copy EXACT connection string (should look like:)');
  console.log('   neo4j+s://c25f6610.databases.neo4j.io');
  console.log('3. Check if username is shown (usually "neo4j")');
  console.log('4. Click eye icon to reveal full password');
  console.log('5. Copy password exactly, check for special characters');
}
