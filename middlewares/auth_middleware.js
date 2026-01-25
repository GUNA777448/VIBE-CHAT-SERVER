// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//     next(); // ✅ MUST be called
//   } catch (e) {
//     return res.status(401).json({ message: "Token is not valid" });
//   }
// };

// module.exports = protect;




const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // 🔹 Get token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // ❌ No token found
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, authorization denied" });
  }

  try {
    // 🔹 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 VERY IMPORTANT: attach user id to request
    req.user = decoded.id;

    next(); // continue to controller
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = protect;
