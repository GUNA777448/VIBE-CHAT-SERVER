// const User = require("../models/user_model");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.register = async (req,res)=>{
//     try {
//         const {username , email,password} = req.body;
//         const userExists = await User.findOne({email});
//         if(userExists){
//             return  res.status(400).json({message:"User already exists . login instead"});
//         }
//         const user = await User.create({
//             username,email,password
//         });
//         return res.status(201).json({message:"User registered successfully", user:{id:user._id, username:user.username,email:user.email}});
//     } catch (e) {
//         res.status(500).json({message:"Server error", error:e.message});
//     }
// }
// exports.login = async (req,res)=>{
//     try {
//         const {email,password} = req.body;
//         const user = await User.findOne({email}).select("+password");
//         if(!user){
//             return res.status(400).json({message:"Invalid credentials"});
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch){
//             // return res.status(400).json({message:"Invalid credentials"});
//             return res.status(400).json({message:"Incorrect Email or Password"});
//         }
//         const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});
//         return res.status(200).json({message:"Login successful", token});
//     } catch (e) {
//         res.status(500).json({message:"Server error", error:e.message});
//     }
// }
// exports.getProfile = async (req,res)=>{
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         if(!user){
//             return res.status(404).json({message:"User not found"});
//         }
//         return res.status(200).json({user});
//     } catch (e) {
//         res.status(500).json({message:"Server error", error:e.message});
//     }
// }   






const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req,res)=>{
    try {
        const {username , email,password} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return  res.status(400).json({message:"User already exists . login instead"});
        }
        const user = await User.create({
            username,email,password
        });
        return res.status(201).json({message:"User registered successfully", user:{id:user._id, username:user.username,email:user.email}});
    } catch (e) {
        res.status(500).json({message:"Server error", error:e.message});
    }
}
exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            // return res.status(400).json({message:"Invalid credentials"});
            return res.status(400).json({message:"Incorrect Email or Password"});
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});
        return res.status(200).json({message:"Login successful", token});
    } catch (e) {
        res.status(500).json({message:"Server error", error:e.message});
    }
}
exports.getProfile = async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({user});
    } catch (e) {
        res.status(500).json({message:"Server error", error:e.message});
    }
}   


exports.updateProfile = async (req, res) => {
  try {
    const { username, email, about, dob, gender } = req.body;

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only provided fields
    if (username !== undefined) user.username = username;
    if (email !== undefined) user.email = email;
    if (about !== undefined) user.about = about;
    if (dob !== undefined) user.dob = dob;
    if (gender !== undefined) user.gender = gender;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        about: user.about,
        dob: user.dob,
        gender: user.gender,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};
