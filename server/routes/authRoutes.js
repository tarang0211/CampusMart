const express = require("express");
const {
  registerUser,
  loginUser,
  verifyEmail,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email", verifyEmail);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "You are authenticated",
    userId: req.user,
  });
});

module.exports = router;