const express = require("express");
const { register, login } = require("../controllers/auth_controller");
const protect = require("../middlewares/auth_middleware");
const arcjetRateLimit = require("../middlewares/arcjet_middleware");

const router = express.Router();

// Apply Arcjet rate limiting to signup and signin routes
router.post("/signup", arcjetRateLimit, register);
router.post("/signin", arcjetRateLimit, login);
// ✅ Protected route example
router.get(
  "/profile",
  protect,
  require("../controllers/auth_controller").getProfile,
);
router.put(
  "/profile",
  protect,
  require("../controllers/auth_controller").updateProfile,
);
module.exports = router;
