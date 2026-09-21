const pool = require('../config/mysql');

async function findOne() {
  const [rows] = await pool.query('SELECT * FROM settings ORDER BY id LIMIT 1');
  if (rows.length === 0) return null;
  const r = rows[0];
  // attach a save method to mimic mongoose behavior in controllers
  r.save = async function () {
    const now = new Date();
    await pool.query(
      `UPDATE settings SET siteName = ?, siteDescription = ?, email = ?, phone = ?, address = ?, facebook = ?, instagram = ?, youtube = ?, linkedin = ?, logoUrl = ?, heroImageUrl = ?, maintenanceMode = ?, allowRegistrations = ?, updated_at = ? WHERE id = ?`,
      [
        this.siteName || null,
        this.siteDescription || null,
        this.email || null,
        this.phone || null,
        this.address || null,
        this.facebook || null,
        this.instagram || null,
        this.youtube || null,
        this.linkedin || null,
        this.logoUrl || null,
        this.heroImageUrl || null,
        this.maintenanceMode ? 1 : 0,
        this.allowRegistrations ? 1 : 0,
        now,
        this.id,
      ]
    );
    return await findOne();
  };
  return r;
}

async function create(data) {
  const now = new Date();
  const [result] = await pool.query(
    `INSERT INTO settings (siteName, siteDescription, email, phone, address, facebook, instagram, youtube, linkedin, logoUrl, heroImageUrl, maintenanceMode, allowRegistrations, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.siteName || 'SellQuick',
      data.siteDescription || 'Find and Sell Properties Easily',
      data.email || 'admin@sellquick.com',
      data.phone || '+94 77 123 4567',
      data.address || 'Colombo, Sri Lanka',
      data.facebook || '',
      data.instagram || '',
      data.youtube || '',
      data.linkedin || '',
      data.logoUrl || '',
      data.heroImageUrl || '',
      data.maintenanceMode ? 1 : 0,
      data.allowRegistrations !== undefined ? (data.allowRegistrations ? 1 : 0) : 1,
      now,
      now,
    ]
  );
  return findOne();
}

module.exports = {
  findOne,
  create,
};
