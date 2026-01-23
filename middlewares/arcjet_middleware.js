const arcjet = require("@arcjet/node").default;
const { fixedWindow, shield, detectBot } = require("@arcjet/node");

// Initialize Arcjet with your key
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"], // Rate limit by IP address
  rules: [
    // Shield protects against common attacks
    shield({ mode: "LIVE" }),

    // Detect and block automated clients/bots
    detectBot({
      mode: "LIVE",
      allow: [
        "CURL", // Allow curl for testing
        "HTTP_LIBRARY", // Allow HTTP libraries
        "POSTMAN", // Allow Postman for API testing
      ],
    }),

    // Fixed window rate limiting for auth routes
    // Allows 5 requests per 60 seconds
    fixedWindow({
      mode: "LIVE",
      max: 5, // Maximum 5 requests
      window: "60s", // Per 60 second window
    }),
  ],
});

// Middleware function for rate limiting auth routes
const arcjetRateLimit = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    // Log decision in development mode
    if (process.env.ARCJET_ENV === "development") {
      console.log("🛡️ Arcjet Decision:", {
        conclusion: decision.conclusion,
        reason: decision.reason,
        ip: decision.ip,
      });
    }

    if (decision.isDenied()) {
      // Handle different denial reasons
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
          retryAfter: decision.reason.resetTime,
        });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({
          success: false,
          message: "Automated requests are not allowed.",
        });
      }

      if (decision.reason.isShield()) {
        return res.status(403).json({
          success: false,
          message: "Request blocked for security reasons.",
        });
      }

      // Generic denial
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    next();
  } catch (error) {
    console.error("🔴 Arcjet Error:", error.message);

    // In development, allow request to continue on Arcjet errors
    if (process.env.ARCJET_ENV === "development") {
      console.warn("⚠️ Arcjet error in development mode - allowing request");
      return next();
    }

    // In production, fail open (allow request) but log the error
    next();
  }
};

module.exports = arcjetRateLimit;
