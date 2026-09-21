const pool = require('../config/mysql');
const bcrypt = require('bcryptjs');

async function findOne(query) {
  if (query && query.email) {
    const [rows] = await pool.query('SELECT * FROM admins WHERE email = ? LIMIT 1', [query.email]);
    if (rows.length === 0) return null;
    const row = rows[0];
    // mimic mongoose document shape used in controllers
    row._id = row.id;
    row.matchPassword = async function (enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    };
    return row;
  }
  return null;
}

async function create({ email, password }) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const now = new Date();
  const [result] = await pool.query(
    'INSERT INTO admins (email, password, created_at, updated_at) VALUES (?, ?, ?, ?)',
    [email, hash, now, now]
  );
  return {
    _id: result.insertId,
    id: result.insertId,
    email,
    password: hash,
    matchPassword: async function (enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    },
  };
}

module.exports = {
  findOne,
  create,
};
