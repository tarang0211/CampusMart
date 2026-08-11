const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, name, token) => {
  try {
    const verificationLink =
      `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    const info = await transporter.sendMail({
      from: `"CampusMart" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your CampusMart account",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          
          <h2>Welcome to CampusMart, ${name}! 🎉</h2>

          <p>
            Thanks for registering. Please verify your email address
            to activate your account.
          </p>

          <a
            href="${verificationLink}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background: #2563eb;
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
            "
          >
            Verify Email
          </a>

          <p style="margin-top: 20px;">
            This verification link will expire in 24 hours.
          </p>

        </div>
      `,
    });

    console.log("✅ Email sent successfully");
    console.log("📧 To:", email);
    console.log("📨 Message ID:", info.messageId);

    return info;

  } catch (error) {
    console.error("❌ Email sending failed:");
    console.error(error);

    throw error;
  }
};

module.exports = { sendVerificationEmail };