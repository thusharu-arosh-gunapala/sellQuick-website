const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: String,
    price: String,
    location: String,
    type: String,

    bedrooms: Number,
    bathrooms: Number,
    area: String,

    description: String,

    features: [String],
    highlights: [String],
    amenities: [String],
    nearby: [String],

    images: [String],

    videoUrl: String,
    videoFile: String,

    phone: String,
    whatsapp: String,

    mapLat: String,
    mapLng: String,

    isFeatured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Property",
  propertySchema
);