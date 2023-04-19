const express = require("express");
const router = express.Router();
const { handleAuth, getMe } = require("../controllers/authController.js");
const verifyJWT = require("../middleware/verifyJWT.js");

router.get("/me", verifyJWT, getMe)
      .post("/", handleAuth);

module.exports = router;
