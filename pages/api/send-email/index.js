// pages/api/v1/send-mail/index.js
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  // Check the HTTP method
  if (req.method === "GET") {
    return res
      .status(405)
      .json({ message: "This endpoint only supports POST requests" });
  }

  if (req.method === "POST") {
    try {
      const { from, subject, text, html } = req.body;
      const recipients = ["business@useknit.io", "info@useknit.io"];

      const msg = {
        to: recipients,
        replyTo: from,
        from: process.env.VERIFIED_SENDER,
        subject,
        text,
        html,
      };

      await sgMail.send(msg);
      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(error?.code || 500).json({
        error: error?.message || "Error sending email",
        status: error?.code || 500,
      });
    }
  }

  // Default case for other methods
  return res.status(405).json({ message: "Method not allowed" });
}
