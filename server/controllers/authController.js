const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/emailService");

// =========================
// REGISTER USER
// =========================

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      hostel,
      phone
    } = req.body;

    // Check all fields
    if (
      !name ||
      !email ||
      !password ||
      !hostel ||
      !phone
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Normalize email
    const normalizedEmail =
      email.trim().toLowerCase();

      

    // Check if user already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken =
      crypto.randomBytes(32).toString("hex");

    // Token expires after 24 hours
    const verificationTokenExpires =
      new Date(
        Date.now() + 24 * 60 * 60 * 1000
      );

    // Create user
    const user = await User.create({
      name: name.trim(),

      email: normalizedEmail,

      phone: phone.trim(),

      hostel: hostel.trim(),

      password: hashedPassword,

      isVerified: false,

      verificationToken,

      verificationTokenExpires,
    });

    // Send verification email
    await sendVerificationEmail(
      user.email,
      user.name,
      verificationToken
    );

    // Success response
    res.status(201).json({
      message:
        "Registration successful. Please check your email to verify your account.",
    });

  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// =========================
// LOGIN USER
// =========================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required",
      });
    }

    // Normalize email
    const normalizedEmail =
      email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    // Check email verification
    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Please verify your email before logging in.",
      });
    }

    // Check password
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Success response
    res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        hostel: user.hostel,
      },
    });

  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// =========================
// VERIFY EMAIL
// =========================

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    // Check token
    if (!token) {
      return res.status(400).json({
        message:
          "Verification token is required",
      });
    }

    // Find user
    const user = await User.findOne({
      verificationToken: token,
    });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid verification token",
      });
    }

    // Check token expiry
    if (
      !user.verificationTokenExpires ||
      user.verificationTokenExpires < new Date()
    ) {
      return res.status(400).json({
        message:
          "Verification token has expired",
      });
    }

    // Verify user
    user.isVerified = true;

    user.verificationToken = null;

    user.verificationTokenExpires = null;

    await user.save();

    res.status(200).json({
      message:
        "Email verified successfully",
    });

  } catch (error) {
    console.error(
      "Email verification error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// =========================
// EXPORT
// =========================

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
};