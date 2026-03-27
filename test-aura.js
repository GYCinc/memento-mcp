import neo4j from 'neo4j-driver';

const uri = 'neo4j+s://c25f6610.databases.neo4j.io';
const username = 'neo4j';
const password = 'zdHkX6I01NK4COA6yV7Lo5pxbelakHcfYqnx7Х27rUs'; // Cyrillic Х

console.log('Testing Neo4j Aura connection');
console.log('URI:', uri);
console.log('Username:', username);
console.log('Password length:', password.length);
console.log('Password characters:');
for (let i = 0; i < password.length; i++) {
  console.log(`  [${i}] ${password[i]} (${password.charCodeAt(i)})`);
}

try {
  const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {});
  console.log('Driver created, trying to verify connectivity...');
  const session = driver.session({ database: 'neo4j' });
  const result = await session.run('RETURN 1 as n');
  console.log('Query result:', result.records[0].get('n'));
  await session.close();
  await driver.close();
  console.log('SUCCESS');
} catch (error) {
  console.error('ERROR:', error.message);
  console.error('Full error:', error);
  process.exit(1);
}
