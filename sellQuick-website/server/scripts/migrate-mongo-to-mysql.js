/*
  Migration script: Read existing MongoDB collections (using mongoose models) and insert into MySQL.
  Usage: set MONGO_URI in server/.env and ensure MySQL env vars are set (or use defaults), then run:
    node server/scripts/migrate-mongo-to-mysql.js
*/

require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const pool = require('../config/mysql');

// reuse existing mongoose models to read data
const Admin = require('../models/Admin');
const Property = require('../models/Property');
const Setting = require('../models/Setting');

async function ensureSchema() {
  const sql = require('fs').readFileSync(__dirname + '/../sql/schema.sql', 'utf8');
  const statements = sql.split(/;\s*\n/).map(s => s.trim()).filter(Boolean);
  for (const stmt of statements) {
    await pool.query(stmt);
  }
}

async function migrateAdmins() {
  const admins = await Admin.find().lean();
  for (const a of admins) {
    const [existing] = await pool.query('SELECT id FROM admins WHERE email = ? LIMIT 1', [a.email]);
    if (existing.length > 0) continue;
    const createdAt = a.createdAt ? new Date(a.createdAt) : new Date();
    const updatedAt = a.updatedAt ? new Date(a.updatedAt) : new Date();
    await pool.query('INSERT INTO admins (email, password, created_at, updated_at) VALUES (?, ?, ?, ?)', [a.email, a.password, createdAt, updatedAt]);
    console.log('Migrated admin', a.email);
  }
}

async function migrateProperties() {
  const props = await Property.find().lean();
  for (const p of props) {
    const createdAt = p.createdAt ? new Date(p.createdAt) : new Date();
    const updatedAt = p.updatedAt ? new Date(p.updatedAt) : new Date();
    await pool.query(`INSERT INTO properties (title, price, location, type, bedrooms, bathrooms, area, description, features, highlights, amenities, nearby, images, videoUrl, videoFile, phone, whatsapp, mapLat, mapLng, isFeatured, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      p.title || null,
      p.price || null,
      p.location || null,
      p.type || null,
      p.bedrooms || null,
      p.bathrooms || null,
      p.area || null,
      p.description || null,
      JSON.stringify(p.features || []),
      JSON.stringify(p.highlights || []),
      JSON.stringify(p.amenities || []),
      JSON.stringify(p.nearby || []),
      JSON.stringify(p.images || []),
      p.videoUrl || null,
      p.videoFile || null,
      p.phone || null,
      p.whatsapp || null,
      p.mapLat || null,
      p.mapLng || null,
      p.isFeatured ? 1 : 0,
      p.status || 'Active',
      createdAt,
      updatedAt,
    ]);
    console.log('Migrated property', p.title || '(no title)');
  }
}

async function migrateSettings() {
  const s = await Setting.findOne().lean();
  if (!s) return;
  const [existing] = await pool.query('SELECT id FROM settings LIMIT 1');
  const createdAt = s.createdAt ? new Date(s.createdAt) : new Date();
  const updatedAt = s.updatedAt ? new Date(s.updatedAt) : new Date();
  if (existing.length === 0) {
    await pool.query(`INSERT INTO settings (siteName, siteDescription, email, phone, address, facebook, instagram, youtube, linkedin, logoUrl, heroImageUrl, maintenanceMode, allowRegistrations, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      s.siteName || 'SellQuick',
      s.siteDescription || 'Find and Sell Properties Easily',
      s.email || 'admin@sellquick.com',
      s.phone || null,
      s.address || null,
      s.facebook || null,
      s.instagram || null,
      s.youtube || null,
      s.linkedin || null,
      s.logoUrl || null,
      s.heroImageUrl || null,
      s.maintenanceMode ? 1 : 0,
      s.allowRegistrations ? 1 : 0,
      createdAt,
      updatedAt,
    ]);
    console.log('Migrated settings');
  } else {
    console.log('Settings row already exists; skipping');
  }
}

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    console.log('Ensuring MySQL schema...');
    await ensureSchema();

    console.log('Migrating admins...');
    await migrateAdmins();

    console.log('Migrating properties...');
    await migrateProperties();

    console.log('Migrating settings...');
    await migrateSettings();

    console.log('Migration complete');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

main();
