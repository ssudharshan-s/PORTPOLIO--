const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log("📥 Form received:", req.body);

    // ✅ Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // ✅ Create transporter for Gmail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // your Gmail App Password
      },
    });

    // ✅ Email options
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`, // must match your Gmail
      replyTo: email, // user’s email for replies
      to: process.env.EMAIL_USER, // receiver (your email)
      subject: `New message from ${name}`,
      text: `
        📩 New message received from your portfolio form

        Name: ${name}
        Email: ${email}
        Subject: ${subject || "(no subject)"}
        Message:
        ${message}
      `,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ message: "Server error. Email not sent." });
  }
});

module.exports = router;
