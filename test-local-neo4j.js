import neo4j from 'neo4j-driver';

const uri = 'bolt://localhost:7687';
const username = 'neo4j';

// Common passwords for local Neo4j instances
const passwords = [
  '', // No password
  'neo4j', // Default
  'memento_password', // Our default
  'password',
  'admin',
  '1234',
  'neo4j123',
  'test',
];

console.log('Testing local Neo4j connection');
console.log('URI:', uri);
console.log('Username:', username);

for (const password of passwords) {
  console.log(`\nTrying password: "${password}" (${password.length} chars)`);

  try {
    const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {
      connectionTimeout: 3000,
    });

    const session = driver.session({ database: 'neo4j' });
    const result = await session.run('RETURN 1 as n');
    const value = result.records[0].get('n');

    await session.close();
    await driver.close();

    console.log(`✅ SUCCESS! Password: "${password}"`);
    console.log('Query returned:', value);
    process.exit(0);
  } catch (error) {
    console.log(`❌ Failed: ${error.code || error.message.split('\n')[0]}`);
  }
}

console.log('\n=== All passwords failed ===');
console.log('\nPossible solutions:');
console.log('1. Check if Neo4j is running: `neo4j status`');
console.log('2. Reset Neo4j password:');
console.log('   a. Open Neo4j Browser: http://localhost:7474');
console.log('   b. Default credentials: neo4j/neo4j');
console.log('   c. It will prompt you to change password on first login');
console.log('3. Disable authentication (for development):');
console.log('   Edit: /opt/homebrew/Cellar/neo4j/2026.01.4/libexec/conf/neo4j.conf');
console.log('   Add: dbms.security.auth_enabled=false');
console.log('   Restart: `neo4j restart`');
console.log('4. Check current password in Neo4j logs');
process.exit(1);
