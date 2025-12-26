// const express = require("express");
// const { register, login } = require("../controllers/auth_controller");
// const protect = require("../middlewares/auth_middleware");

// const router = express.Router();

// router.post("/signup", register);
// router.post("/signin", login);
// // ✅ Protected route example
// router.get("/profile", protect, (req, res) => {
//   res.json({
//     message: "Protected route accessed",
//     userId: req.user,
//   });
// });





// module.exports = router;






const express = require("express");
const {
  register,
  login,
  updateProfile,
} = require("../controllers/auth_controller");

const protect = require("../middlewares/auth_middleware");
const User = require("../models/user_model");

const router = express.Router();

// AUTH
router.post("/signup", register);
router.post("/signin", login);

// GET profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

// UPDATE profile
router.put("/profile", protect, updateProfile);

module.exports = router;
