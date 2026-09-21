CREATE DATABASE IF NOT EXISTS sellquick CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE sellquick;

CREATE TABLE IF NOT EXISTS admins (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admins_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS properties (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NULL,
  price VARCHAR(100) NULL,
  location VARCHAR(255) NULL,
  type VARCHAR(100) NULL,
  bedrooms INT NULL,
  bathrooms INT NULL,
  area VARCHAR(100) NULL,
  description TEXT NULL,
  features JSON NOT NULL,
  highlights JSON NOT NULL,
  amenities JSON NOT NULL,
  nearby JSON NOT NULL,
  images JSON NOT NULL,
  videoUrl VARCHAR(1000) NULL,
  videoFile VARCHAR(1000) NULL,
  phone VARCHAR(50) NULL,
  whatsapp VARCHAR(50) NULL,
  mapLat VARCHAR(100) NULL,
  mapLng VARCHAR(100) NULL,
  isFeatured TINYINT(1) NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'Active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_properties_created_at (created_at),
  KEY idx_properties_status (status),
  KEY idx_properties_featured (isFeatured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS settings (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  siteName VARCHAR(255) NOT NULL DEFAULT 'SellQuick',
  siteDescription TEXT NULL,
  email VARCHAR(255) NULL,
  phone VARCHAR(50) NULL,
  address VARCHAR(500) NULL,
  facebook VARCHAR(1000) NULL,
  instagram VARCHAR(1000) NULL,
  youtube VARCHAR(1000) NULL,
  linkedin VARCHAR(1000) NULL,
  logoUrl VARCHAR(1000) NULL,
  heroImageUrl VARCHAR(1000) NULL,
  maintenanceMode TINYINT(1) NOT NULL DEFAULT 0,
  allowRegistrations TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO settings (siteName, siteDescription, email, phone, address)
SELECT 'SellQuick', 'Find and Sell Properties Easily', 'admin@sellquick.com', '+94 77 123 4567', 'Colombo, Sri Lanka'
WHERE NOT EXISTS (SELECT 1 FROM settings LIMIT 1);
