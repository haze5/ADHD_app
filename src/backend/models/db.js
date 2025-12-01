// filepath: src/backend/models/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'focusguard',
  password: 'yourpassword',
  port: 5432,
});

module.exports = pool;