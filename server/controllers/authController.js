const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

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
      phone,
    } = req.body;

    if (!name || !email || !password || !hostel || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      hostel: hostel.trim(),
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "Registration successful",
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
    console.error("Registration error:", error);

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

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.password) {
      return res.status(401).json({
        message:
          "This account uses Google login. Please continue with Google.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

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
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// =========================
// GOOGLE LOGIN / REGISTER
// =========================

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        message: "Invalid Google credential",
      });
    }

    const {
      sub: googleId,
      email,
      name,
      picture,
      email_verified,
    } = payload;

    if (!email || !email_verified) {
  return res.status(401).json({
    message: "Google email could not be verified",
  });
}

const normalizedEmail = email.trim().toLowerCase();

if (!normalizedEmail.endsWith("@bitmesra.ac.in")) {
  return res.status(403).json({
    message: "Only BIT Mesra email addresses are allowed.",
  });
}

    let user = await User.findOne({
      email: normalizedEmail,
    });

    // ==========================================
    // NEW GOOGLE USER
    // ==========================================

    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email: normalizedEmail,
        googleId,
        profilePicture: picture || "",
        phone: "",
        hostel: "",
        password: null,
      });

      const profileToken = jwt.sign(
        {
          userId: user._id,
          profileCompletion: true,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
        }
      );

      return res.status(201).json({
        message: "Google registration started",
        isNewUser: true,
        token: profileToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          hostel: user.hostel,
          profilePicture: user.profilePicture,
        },
      });
    }

    // ==========================================
    // EXISTING USER
    // ==========================================

    if (!user.googleId) {
      user.googleId = googleId;
    }

    if (!user.profilePicture && picture) {
      user.profilePicture = picture;
    }

    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Google login successful",
      isNewUser: false,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        hostel: user.hostel,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);

    res.status(401).json({
      message: "Google authentication failed",
      error: error.message,
    });
  }
};

// =========================
// COMPLETE GOOGLE PROFILE
// =========================

const completeProfile = async (req, res) => {
  try {
    const { phone, hostel } = req.body;

    if (!phone || !hostel) {
      return res.status(400).json({
        message: "Phone number and hostel are required",
      });
    }

    const trimmedPhone = phone.trim();
    const trimmedHostel = hostel.trim();

    if (!trimmedPhone || !trimmedHostel) {
      return res.status(400).json({
        message: "Phone number and hostel are required",
      });
    }

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.phone = trimmedPhone;
    user.hostel = trimmedHostel;

    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Profile completed successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        hostel: user.hostel,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Profile completion error:", error);

    return res.status(500).json({
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
  googleLogin,
  completeProfile,
};