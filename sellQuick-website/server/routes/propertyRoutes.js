const express = require("express");
const upload = require("../middleware/upload");
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getProperty);

router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 20 },
    { name: "videoFile", maxCount: 1 },
  ]),
  createProperty
);

router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 20 },
    { name: "videoFile", maxCount: 1 },
  ]),
  updateProperty
);
router.delete("/:id", deleteProperty);

module.exports = router;
