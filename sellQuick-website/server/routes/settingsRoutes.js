const express = require("express");
const upload = require("../middleware/upload");
const { getSettings, updateSettings } = require("../controllers/settingsController");

const router = express.Router();

router.get("/", getSettings);

router.put(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "heroImage", maxCount: 1 },
  ]),
  updateSettings
);

module.exports = router;
