const express = require("express");

const {
  registerUser,
  loginUser,
  googleLogin,
  completeProfile,
} = require("../controllers/authController");

const {
  protect,
  profileCompletionProtect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// NORMAL AUTHENTICATION
// =========================

router.post("/register", registerUser);

router.post("/login", loginUser);

// =========================
// GOOGLE AUTHENTICATION
// =========================

router.post("/google", googleLogin);

// =========================
// GOOGLE PROFILE COMPLETION
// =========================

router.post(
  "/complete-profile",
  profileCompletionProtect,
  completeProfile
);

// =========================
// PROTECTED PROFILE
// =========================

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "You are authenticated",
    userId: req.user,
  });
});

module.exports = router;