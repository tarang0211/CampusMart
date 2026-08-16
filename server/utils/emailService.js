const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
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
      from: `"BitMart" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your BitMart account",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 30px;
          background: #f8fafc;
          border-radius: 12px;
        ">

          <h2 style="color: #2563eb;">
            Welcome to BitMart, ${name}! 🎉
          </h2>

          <p style="color: #374151; font-size: 15px;">
            Thanks for registering with BitMart.
          </p>

          <p style="color: #374151; font-size: 15px;">
            Please verify your email address by clicking the button below.
          </p>

          <a
            href="${verificationLink}"
            style="
              display: inline-block;
              margin-top: 15px;
              padding: 12px 22px;
              background: #2563eb;
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
            "
          >
            Verify Email
          </a>

          <p style="
            margin-top: 25px;
            color: #6b7280;
            font-size: 13px;
          ">
            This verification link will expire in 24 hours.
          </p>

          <p style="
            margin-top: 20px;
            color: #9ca3af;
            font-size: 12px;
          ">
            If you didn't create a BitMart account, you can safely ignore this email.
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

module.exports = {
  sendVerificationEmail,
};