const pool = require('../config/mysql');

(async () => {
  try {
    console.log('Attempting to get a connection from MySQL pool...');
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Query result:', rows);
    console.log('MySQL connection OK');
    process.exit(0);
  } catch (err) {
    console.error('MySQL connection failed:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
