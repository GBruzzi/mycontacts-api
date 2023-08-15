const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123456',
  database: 'mycontacts',
});

client.connect();


exports.query = async (query,VALUES) => {
  const { rows } = await client.query(query,VALUES);
  return rows;
}


