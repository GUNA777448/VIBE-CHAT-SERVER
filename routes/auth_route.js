const express = require("express");
const { register, login } = require("../controllers/auth_controller");
const protect = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
// ✅ Protected route example
router.get("/profile", protect, require("../controllers/auth_controller").getProfile);
router.put("/profile", protect, require("../controllers/auth_controller").updateProfile);
module.exports = router;
