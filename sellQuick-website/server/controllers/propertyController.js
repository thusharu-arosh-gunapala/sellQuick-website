const Property = require("../models_sql/PropertySQL");

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProperty = async (req, res) => {
  try {
    const images =
      req.files?.images?.map((file) => `/uploads/${file.filename}`) || [];

    const videoFile = req.files?.videoFile?.[0]
      ? `/uploads/${req.files.videoFile[0].filename}`
      : "";

    const isFeatured =
      req.body.isFeatured === "true" || req.body.isFeatured === true;

    const property = await Property.create({
      title: req.body.title,
      price: req.body.price,
      location: req.body.location,
      type: req.body.type,
      bedrooms: req.body.bedrooms ? Number(req.body.bedrooms) : undefined,
      bathrooms: req.body.bathrooms ? Number(req.body.bathrooms) : undefined,
      area: req.body.area,
      description: req.body.description,
      features: typeof req.body.features === "string" ? JSON.parse(req.body.features || "[]") : (req.body.features || []),
      highlights: typeof req.body.highlights === "string" ? JSON.parse(req.body.highlights || "[]") : (req.body.highlights || []),
      amenities: typeof req.body.amenities === "string" ? JSON.parse(req.body.amenities || "[]") : (req.body.amenities || []),
      nearby: typeof req.body.nearby === "string" ? JSON.parse(req.body.nearby || "[]") : (req.body.nearby || []),
      images,
      videoUrl: req.body.videoUrl,
      videoFile,
      phone: req.body.phone,
      whatsapp: req.body.whatsapp,
      mapLat: req.body.mapLat,
      mapLng: req.body.mapLng,
      isFeatured,
      status: req.body.status || "Active",
    });

    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files?.images && req.files.images.length > 0) {
      const newImages = req.files.images.map((file) => `/uploads/${file.filename}`);
      updateData.images = newImages;
    }

    if (req.files?.videoFile?.[0]) {
      updateData.videoFile = `/uploads/${req.files.videoFile[0].filename}`;
    }

    if (updateData.isFeatured !== undefined) {
      updateData.isFeatured =
        updateData.isFeatured === "true" || updateData.isFeatured === true;
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
