const express = require("express");
const { register, login } = require("../controllers/auth_controller");
const protect = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
// ✅ Protected route example
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    userId: req.user,
  });
});

module.exports = router;
