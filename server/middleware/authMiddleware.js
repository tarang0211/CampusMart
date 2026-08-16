const jwt = require("jsonwebtoken");

// =========================
// NORMAL AUTHENTICATION
// =========================

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};

// =========================
// PROFILE COMPLETION AUTH
// =========================

const profileCompletionProtect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Profile completion token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decoded.profileCompletion) {
      return res.status(403).json({
        message: "Profile completion authorization required",
      });
    }

    req.user = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired profile completion token",
    });
  }
};

module.exports = {
  protect,
  profileCompletionProtect,
};