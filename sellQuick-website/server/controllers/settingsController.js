const Setting = require("../models_sql/SettingSQL");
const fs = require("fs");
const path = require("path");

const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }

    // Update text fields
    const fields = [
      "siteName", "siteDescription", "email", "phone", "address", 
      "facebook", "instagram", "youtube", "linkedin"
    ];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) settings[field] = req.body[field];
    });

    // Update boolean fields
    if (req.body.maintenanceMode !== undefined) {
      settings.maintenanceMode = req.body.maintenanceMode === "true" || req.body.maintenanceMode === true;
    }
    if (req.body.allowRegistrations !== undefined) {
      settings.allowRegistrations = req.body.allowRegistrations === "true" || req.body.allowRegistrations === true;
    }

    // Process files if any
    if (req.files) {
      if (req.files.logo && req.files.logo.length > 0) {
        settings.logoUrl = `/uploads/${req.files.logo[0].filename}`;
      }
      if (req.files.heroImage && req.files.heroImage.length > 0) {
        settings.heroImageUrl = `/uploads/${req.files.heroImage[0].filename}`;
      }
    }

    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
