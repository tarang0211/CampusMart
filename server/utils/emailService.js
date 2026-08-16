const sendVerificationEmail = async (email, name, token) => {
  try {
    const verificationLink =
      `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [email],
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
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Resend email failed:", data);
      throw new Error(data.message || "Failed to send verification email");
    }

    console.log("✅ Email sent successfully");
    console.log("📧 To:", email);
    console.log("📨 Email ID:", data.id);

    return data;
  } catch (error) {
    console.error("❌ Email sending failed:");
    console.error(error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
};