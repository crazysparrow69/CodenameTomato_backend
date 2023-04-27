const express = require("express");
const router = express.Router();
const { createImage, getImage } = require("../controllers/imageController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/", verifyJWT, getImage)
      .post("/", verifyJWT, createImage);

module.exports = router;