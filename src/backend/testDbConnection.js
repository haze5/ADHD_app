// filepath: d:\ADHD_app\src\backend\testDbConnection.js
const pool = require('./models/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully:', res.rows[0]);
  }
  pool.end();
});