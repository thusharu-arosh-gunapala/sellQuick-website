const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "SellQuick" },
    siteDescription: { type: String, default: "Find and Sell Properties Easily" },
    email: { type: String, default: "admin@sellquick.com" },
    phone: { type: String, default: "+94 77 123 4567" },
    address: { type: String, default: "Colombo, Sri Lanka" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    heroImageUrl: { type: String, default: "" },
    maintenanceMode: { type: Boolean, default: false },
    allowRegistrations: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);
