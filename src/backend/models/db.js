// filepath: src/backend/models/db.js
const { Pool } = require('pg');

// 调试信息：检查环境变量是否正确加载
console.log('Database config:', {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD ? '***' : 'undefined',
  port: process.env.DB_PORT
});

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'focusguard',
  password: String(process.env.DB_PASSWORD || ''), // 确保密码是字符串类型
  port: parseInt(process.env.DB_PORT) || 5432,
});

module.exports = pool;
