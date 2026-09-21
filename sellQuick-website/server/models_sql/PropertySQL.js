const pool = require('../config/mysql');

function toJsonField(val) {
  try {
    return JSON.stringify(val || []);
  } catch (e) {
    return JSON.stringify([]);
  }
}

function fromJsonField(val) {
  try {
    return typeof val === 'string' ? JSON.parse(val) : val;
  } catch (e) {
    return [];
  }
}

async function find() {
  const [rows] = await pool.query('SELECT * FROM properties ORDER BY created_at DESC');
  return rows.map((r) => ({
    ...r,
    features: fromJsonField(r.features),
    highlights: fromJsonField(r.highlights),
    amenities: fromJsonField(r.amenities),
    nearby: fromJsonField(r.nearby),
    images: fromJsonField(r.images),
    _id: r.id,
  }));
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM properties WHERE id = ? LIMIT 1', [id]);
  if (rows.length === 0) return null;
  const r = rows[0];
  r.features = fromJsonField(r.features);
  r.highlights = fromJsonField(r.highlights);
  r.amenities = fromJsonField(r.amenities);
  r.nearby = fromJsonField(r.nearby);
  r.images = fromJsonField(r.images);
  r._id = r.id;
  return r;
}

async function create(data) {
  const now = new Date();
  const [result] = await pool.query(
    `INSERT INTO properties
      (title, price, location, type, bedrooms, bathrooms, area, description, features, highlights, amenities, nearby, images, videoUrl, videoFile, phone, whatsapp, mapLat, mapLng, isFeatured, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title || null,
      data.price || null,
      data.location || null,
      data.type || null,
      data.bedrooms || null,
      data.bathrooms || null,
      data.area || null,
      data.description || null,
      toJsonField(data.features),
      toJsonField(data.highlights),
      toJsonField(data.amenities),
      toJsonField(data.nearby),
      toJsonField(data.images),
      data.videoUrl || null,
      data.videoFile || null,
      data.phone || null,
      data.whatsapp || null,
      data.mapLat || null,
      data.mapLng || null,
      data.isFeatured ? 1 : 0,
      data.status || 'Active',
      now,
      now,
    ]
  );
  return findById(result.insertId);
}

async function findByIdAndUpdate(id, updateData) {
  const existing = await findById(id);
  if (!existing) return null;
  const now = new Date();
  const merged = { ...existing, ...updateData };

  await pool.query(
    `UPDATE properties SET title = ?, price = ?, location = ?, type = ?, bedrooms = ?, bathrooms = ?, area = ?, description = ?, features = ?, highlights = ?, amenities = ?, nearby = ?, images = ?, videoUrl = ?, videoFile = ?, phone = ?, whatsapp = ?, mapLat = ?, mapLng = ?, isFeatured = ?, status = ?, updated_at = ? WHERE id = ?`,
    [
      merged.title || null,
      merged.price || null,
      merged.location || null,
      merged.type || null,
      merged.bedrooms || null,
      merged.bathrooms || null,
      merged.area || null,
      merged.description || null,
      toJsonField(merged.features),
      toJsonField(merged.highlights),
      toJsonField(merged.amenities),
      toJsonField(merged.nearby),
      toJsonField(merged.images),
      merged.videoUrl || null,
      merged.videoFile || null,
      merged.phone || null,
      merged.whatsapp || null,
      merged.mapLat || null,
      merged.mapLng || null,
      merged.isFeatured ? 1 : 0,
      merged.status || 'Active',
      now,
      id,
    ]
  );
  return findById(id);
}

async function findByIdAndDelete(id) {
  const existing = await findById(id);
  if (!existing) return null;
  await pool.query('DELETE FROM properties WHERE id = ?', [id]);
  return existing;
}

module.exports = {
  find,
  findById,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
};
