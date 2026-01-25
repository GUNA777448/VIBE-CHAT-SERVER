// const User = require("../models/user_model");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const {
//   generateAccessToken,
//   generateRefreshToken,
// } = require("../utils/generate_tokens");
// exports.register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res
//         .status(400)
//         .json({ message: "User already exists . login instead" });
//     }
//     const user = await User.create({
//       username,
//       email,
//       password,
//     });

//     // Generate tokens for immediate login after signup
//     const accessToken = generateAccessToken(user._id);
//     const { token: refreshToken, hashedToken } = generateRefreshToken();

//     // Save refresh token
//     user.refreshToken = hashedToken;
//     await user.save();

//     // Set refresh token cookie
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: false, // true in production (HTTPS)
//       sameSite: "Strict",
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     });

//     return res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//       token: accessToken,
//       refreshToken: refreshToken,
//     });
//   } catch (e) {
//     res.status(500).json({ message: "Server error", error: e.message });
//   }
// };
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1️⃣ Find user
//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 2️⃣ Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 3️⃣ Generate tokens
//     const accessToken = generateAccessToken(user._id);
//     const { token: refreshToken, hashedToken } = generateRefreshToken();

//     // 4️⃣ Save refresh token
//     user.refreshToken = hashedToken;
//     await user.save();

//     // 5️⃣ Set refresh token cookie
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: false, // true in production (HTTPS)
//       sameSite: "Strict",
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     });

//     // 6️⃣ Send response
//     return res.status(200).json({
//       message: "Login successful",
//       token: accessToken,
//       refreshToken,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//     });
//   } catch (e) {
//     return res.status(500).json({
//       message: "Server error",
//       error: e.message,
//     });
//   }
// };

// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// exports.updateProfile = async (req, res) => {
//   try {
//     const { username, mobile, avatar } = req.body;
//     const updatedData = {};
//     if (username) updatedData.username = username;
//     if (mobile) updatedData.mobile = mobile;
//     if (avatar) updatedData.avatar = avatar;
//     const updateduser = await User.findByIdAndUpdate(
//       req.user,
//       { $set: updatedData },
//       { new: true, runValidators: true }
//     ).select("-password");
//     if (!updateduser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res
//       .status(200)
//       .json({ message: "Profile updated successfully", user: updateduser });
//   } catch (e) {
//     res.status(500).json({ message: "Server error", error: e.message });
//   }
// };









const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generate_tokens");

/* ================= REGISTER ================= */

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists. Login instead." });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const { token: refreshToken, hashedToken } = generateRefreshToken();

    // Save refresh token
    user.refreshToken = hashedToken;
    await user.save();

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      token: accessToken,
      refreshToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

/* ================= LOGIN ================= */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const { token: refreshToken, hashedToken } = generateRefreshToken();

    // Save refresh token
    user.refreshToken = hashedToken;
    await user.save();

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // Send response
    return res.status(200).json({
      message: "Login successful",
      token: accessToken,
      refreshToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: "Server error",
      error: e.message,
    });
  }
};

/* ================= GET MY PROFILE ================= */

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* ================= UPDATE PROFILE ================= */

exports.updateProfile = async (req, res) => {
  try {
    const { username, mobile, avatar, bio, gender, birthday } = req.body;

    const updatedData = {};

    // Only update fields that are sent
    if (username !== undefined) updatedData.username = username;
    if (mobile !== undefined) updatedData.mobile = mobile;
    if (avatar !== undefined) updatedData.avatar = avatar;
    if (bio !== undefined) updatedData.bio = bio;
    if (gender !== undefined) updatedData.gender = gender;
    if (birthday !== undefined) updatedData.birthday = birthday;

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { $set: updatedData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 Send updated profile directly
    return res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
};
